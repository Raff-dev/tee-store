from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .models import Category, Product, Collection, Size
from .serializers import ProductListSerializer, ProductDetailSerializer
from .cart_serializers import CartSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = ProductListSerializer(self.queryset, many=True)
        data = {
            'categories': Category.objects.values_list('name', flat=True),
            'collections': Collection.objects.values_list('name', flat=True),
            'products': serializer.data,
        }
        return Response(data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ProductDetailSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def cart(self, request, *args, **kwargs):
        try:
            ids = list(map(lambda id: int(id), request.data['ids']))
            sizes = Size.objects.filter(id__in=ids)
            serializer = CartSerializer(sizes, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)
