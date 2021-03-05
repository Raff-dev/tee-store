from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .models import Category, Product, Collection, Size
from .serializers import CollectionSerializer, ProductListSerializer, ProductDetailSerializer, CategorySerializer
from .cart_serializers import CartSerializer
import json


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()

    def list(self, request, *args, **kwargs):
        serializer = ProductListSerializer(self.queryset, many=True)
        data = {
            'categories': Category.objects.values_list('name', flat=True),
            'collections': Collection.objects.values_list('name', flat=True),
            'products': serializer.data,
        }
        return Response(data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ProductDetailSerializer(instance)

        return Response(serializer.data)


class SizeViewSet(viewsets.GenericViewSet):
    queryset = Size.objects.all()
    serializer_class = CartSerializer

    @action(methods=['POST'], detail=False)
    def cart_products(self, request, *args, **kwargs):
        if 'ids' not in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        ids = list(map(lambda id: int(id), request.data['ids']))
        sizes = Size.objects.filter(id__in=ids)
        serializer = CartSerializer(sizes, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'name'


class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = 'name'
