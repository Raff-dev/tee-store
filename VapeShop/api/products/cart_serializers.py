from rest_framework import serializers
from .models import Size


class CartSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField()
    variant_name = serializers.StringRelatedField()
    product_id = serializers.StringRelatedField()
    size = serializers.StringRelatedField()
    size_label = serializers.StringRelatedField()

    price = serializers.StringRelatedField()
    title = serializers.StringRelatedField()
    image = serializers.ImageField()
    properties = serializers.StringRelatedField()

    category = serializers.StringRelatedField()
    collection = serializers.StringRelatedField()

    class Meta:
        model = Size
        fields = '__all__'
