from django.contrib import admin
from .models import Category, Collection, Product, Size, Variant, Image

admin.site.register(Category)
admin.site.register(Collection)
admin.site.register(Product)
admin.site.register(Size)
admin.site.register(Variant)
admin.site.register(Image)
