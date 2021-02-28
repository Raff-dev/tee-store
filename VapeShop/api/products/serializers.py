from rest_framework import serializers
from .models import Image, Product, Category, Collection, Size, Variant


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        exclude = ['variant']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        exclude = ['variant']


class VariantListSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

    class Meta:
        model = Variant
        exclude = ['product']


class VariantDetailSerializer(VariantListSerializer):
    sizes = SizeSerializer(many=True, read_only=True)


class ProductDetailSerializer(serializers.ModelSerializer):
    variants = VariantDetailSerializer(many=True, read_only=True)
    category = serializers.StringRelatedField(many=False)
    collection = serializers.StringRelatedField(many=False)

    class Meta:
        model = Product
        exclude = ['created_at', 'updated_at']


class ProductListSerializer(ProductDetailSerializer):
    variants = VariantListSerializer(many=True, read_only=True)

    class Meta(ProductDetailSerializer.Meta):
        exclude = ProductDetailSerializer.Meta.exclude + [
            'title', 'material', 'description']


class CategorySerializer(serializers.ModelSerializer):
    products = ProductListSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        exclude = ['id']
        lookup_field = 'name'


class CollectionSerializer(serializers.ModelSerializer):
    products = ProductListSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        exclude = ['id']
        lookup_field = 'name'
