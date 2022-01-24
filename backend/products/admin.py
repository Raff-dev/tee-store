from django.contrib import admin
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html

import nested_admin

from .models import Category, Collection, Product, Instance, Variant, Image
from .forms import ProductForm

domain = 'http://localhost:8000'


def create_related_link(id, count, this_name, model_name, label, page='changelist'):
    url = (
        reverse(f'admin:products_{model_name}_{page}') + '?'
        + urlencode({f'{this_name}__id': id})
    )
    return format_html(f'<a href=\"{url}\">{count} {label}')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'related_products']

    def related_products(self, obj):
        count = obj.products.count()
        return create_related_link(obj.id, count, 'category', 'product', 'Products')

    related_products.short_description = 'Products'


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at', 'related_products']

    def related_products(self, obj):
        count = obj.products.count()
        return create_related_link(obj.id, count, 'collection', 'product', 'Products')

    related_products.short_description = 'Products'


class ImageInline(nested_admin.NestedTabularInline):
    list_display = ['filename',  'display', 'ordering']
    model = Image

    def display(self, obj):
        return format_html(f'<img src="{domain}/media/{obj.image}" style="height:50px;"/>')


class VariantInline(nested_admin.NestedStackedInline):
    model = Variant
    inlines = [ImageInline]


@admin.register(Product)
class ProductAdmin(nested_admin.NestedModelAdmin):
    list_display = ['name', 'category', 'collection', 'price', 'discount_price', 'related_variants', 'sized', 'created_at']
    list_filter = ['collection', 'category']
    inlines = [VariantInline]

    def related_variants(self, obj):
        count = obj.variants.count()
        return create_related_link(obj.id, count, 'product', 'variant', 'Variants')

    related_variants.short_description = 'Variants'


@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    list_display = ['name', 'product',
                    # 'display',
                    'is_default', 'related_images']
    list_filter = ['product__collection', 'product__category']

    # def display(self, obj):
    #     return format_html(f'<img src="{domain}/media/{obj.images.first().image}" style="height:50px;"/>')

    def related_images(self, obj):
        count = obj.images.count()
        return create_related_link(obj.id, count, 'variant', 'image', 'Images')

    related_images.short_description = 'Images'


@admin.register(Instance)
class InstanceAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'product', 'variant',  'quantity']


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'display', 'product', 'variant', 'ordering']

    def display(self, obj):
        return format_html(f'<img src="{domain}/media/{obj.image}" style="height:50px;"/>')
