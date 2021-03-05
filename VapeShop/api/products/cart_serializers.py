from rest_framework import serializers
from .models import Size


class CartSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField(many=False)
    variant = serializers.StringRelatedField(many=False)
    size = serializers.StringRelatedField(many=False)

    price = serializers.StringRelatedField(many=False)
    title = serializers.StringRelatedField(many=False)
    image = serializers.ImageField()
    properties = serializers.StringRelatedField(many=False)

    category = serializers.StringRelatedField(many=False)
    collection = serializers.StringRelatedField(many=False)

    class Meta:
        model = Size
        fields = '__all__'
