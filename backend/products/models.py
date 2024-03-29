import os
from django.db import models
from django.db.models.base import Model
from django.db.models.fields.files import ImageField
from django.conf import settings


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        verbose_name_plural = "Categories"


class Collection(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        ordering = ['-created_at']


class Product(models.Model):
    name = models.CharField(max_length=50, blank=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection, related_name='products', on_delete=models.CASCADE)

    price = models.DecimalField(max_digits=5, decimal_places=2)
    discount_price = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    sized = models.BooleanField(default=False)
    title = models.CharField(max_length=50, blank=True)
    material = models.TextField(blank=True)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __init__(self, *args, **kwargs):
        self.variant_name = kwargs.pop('variant') if 'variant' in kwargs else None
        self.image = kwargs.pop('image') if 'image' in kwargs else None
        super(Product, self).__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        created = self.pk is None
        self.name = self.name or self.collection.name
        result = super(Product, self).save(*args, **kwargs)

        if created:
            variant = Variant.objects.create(product=self, is_default=True)
            variant.name = self.variant_name or variant.name
            # variant.save()

            image = Image.objects.create(variant=variant, ordering=1)
            image.image = self.image or image.image
            # image.save()

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        ordering = ['-collection__created_at', 'category__name']


class Variant(models.Model):
    name = models.CharField(max_length=50, default='default')
    product = models.ForeignKey(Product, related_name='variants', on_delete=models.CASCADE)
    is_default = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        created = self.pk is None
        res = super(Variant, self).save(*args, **kwargs)

        if created:
            sizes = Instance.SIZES if self.product.sized else [Instance.NA]
            for size_name in sizes:
                Instance.objects.create(size=size_name, variant=self)
        return res

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        ordering = ['product__collection__created_at', 'product__category__name', 'name']
        unique_together = ['name', 'product']


def get_upload_path(image, filename):
    return f'{Image.IMAGES_PATH}/{image.product.category.name}/{filename}'


class Image(models.Model):
    IMAGES_PATH = 'product_images'
    DEFAULT_IMAGE = 'default_product_image.png'

    image = models.ImageField(
        upload_to=get_upload_path,
        default=f'{IMAGES_PATH}/{DEFAULT_IMAGE}')
    variant = models.ForeignKey(Variant, related_name='images', on_delete=models.CASCADE)
    ordering = models.PositiveIntegerField()

    def __str__(self) -> str:
        return f'{self.variant} image'

    class Meta:
        unique_together = [('ordering', 'variant')]
        ordering = ['ordering']

    @property
    def product(self):
        return self.variant.product

    def filename(self):
        return os.path.basename(self.image.name)


class Instance(models.Model):
    NA = ('NA', 'Not Applicable')
    SIZES = [
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
    ]

    size = models.CharField(choices=SIZES+[NA], max_length=50, default=NA)
    variant = models.ForeignKey(Variant, related_name='instances', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        label = self.get_size_display().split("'")
        return f'{label[1]} - {label[3]}'

    class Meta:
        unique_together = [('size', 'variant')]

    @property
    def name(self) -> str:
        return f'{self.product.name} - {self.variant_name} - {self.size_label}'

    @property
    def category(self) -> str:
        return self.variant.product.category

    @property
    def product_id(self):
        return self.variant.product.id

    @property
    def product(self):
        return self.variant.product

    @property
    def collection(self) -> str:
        return self.variant.product.collection

    @property
    def variant_name(self) -> str:
        return self.variant.name

    @property
    def title(self) -> str:
        return self.variant.product.title

    @property
    def price(self):
        return self.variant.product.price

    @property
    def size_label(self):
        return self.get_size_display().split("'")[3]

    @property
    def image(self):
        return self.variant.images.first().image
