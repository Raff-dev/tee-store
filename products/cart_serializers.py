from rest_framework import serializers
from .models import Instance


class CartSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField()
    variant_name = serializers.StringRelatedField()
    product_id = serializers.StringRelatedField()
    instance = serializers.StringRelatedField()
    size_label = serializers.StringRelatedField()

    price = serializers.StringRelatedField()
    title = serializers.StringRelatedField()
    image = serializers.ImageField()
    properties = serializers.StringRelatedField()

    category = serializers.StringRelatedField()
    collection = serializers.StringRelatedField()

    class Meta:
        model = Instance
        fields = '__all__'
