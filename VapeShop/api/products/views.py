from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import ProductSerializer, CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(methods=['get'], detail=False)
    def get_categories(self, request, *args, **kwargs):
        category_name = kwargs['category']
        category = Category.objects.filter(name=category_name).first()
        products = self.queryset.filter(category=category)

        prorducts_serialized = products
        return Response(data=prorducts_serialized, status=status.HTTP_200_OK)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
