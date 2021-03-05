from rest_framework import serializers
from .models import Image, Product, Category, Collection, Size, Variant


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image']


class CartProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(many=False)
    collection = serializers.StringRelatedField(many=False)

    class Meta:
        model = Product
        fields = ['name', 'price', 'discount_price', 'title', 'category', 'collection']


class CartVariantSerializer(serializers.ModelSerializer):
    product = CartProductSerializer(many=False)
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Variant
        fields = ['name', 'product', 'images']


class CartSizeSerializer(serializers.ModelSerializer):
    variant = CartVariantSerializer(many=False)

    class Meta:
        model = Size
        fields = ['size', 'variant']
