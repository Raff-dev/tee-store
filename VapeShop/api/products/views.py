from rest_framework import viewsets
from rest_framework.response import Response
from .models import Category, Product, Collection
from .serializers import CollectionSerializer, ProductListSerializer, ProductDetailSerializer, CategorySerializer


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


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'name'


class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = 'name'
