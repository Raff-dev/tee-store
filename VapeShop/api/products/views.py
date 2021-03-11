from functools import reduce
import json
from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from .models import Category, Product, Collection, Size
from .serializers import CollectionSerializer, ProductListSerializer, ProductDetailSerializer, CategorySerializer
from .cart_serializers import CartSerializer
import stripe


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


class CartViewSet(viewsets.GenericViewSet):
    queryset = Size.objects.all()
    serializer_class = CartSerializer

    @action(methods=['POST'], detail=False)
    def cart_products(self, request, *args, **kwargs):
        try:
            ids = list(map(lambda id: int(id), request.data['ids']))
            sizes = Size.objects.filter(id__in=ids)
            serializer = CartSerializer(sizes, many=True)
            return Response(serializer.data)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def create_payment_session(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            ids = [int(id) for id in request.data.keys()]
            sizes = Size.objects.filter(id__in=ids)
            amount = int(reduce(lambda total, size: total+size.price*request.data[str(size.id)]*100, sizes, 0))
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='eur',
                payment_method_types=['p24'],
            )
            result = {'clientSecret': intent['client_secret']}
            return Response(result, status.HTTP_202_ACCEPTED)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'name'


class CollectionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    lookup_field = 'name'
