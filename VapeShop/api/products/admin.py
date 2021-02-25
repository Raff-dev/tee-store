from django.contrib import admin
from .models import Category, Product, SizedProduct, Variant, Image

admin.register(Category)
admin.register(Product)
admin.register(SizedProduct)
admin.register(Variant)
admin.register(Image)
