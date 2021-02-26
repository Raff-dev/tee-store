from django.contrib import admin
from .models import Category, Product, Size, Variant, Image

admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Size)
admin.site.register(Variant)
admin.site.register(Image)
