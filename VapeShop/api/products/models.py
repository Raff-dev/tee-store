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

    def __str__(self) -> str:
        return f'{self.name}'


class Product(models.Model):
    name = models.CharField(max_length=50, blank=True)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    collection = models.ForeignKey(Collection, related_name='products', on_delete=models.CASCADE)

    price = models.DecimalField(max_digits=5, decimal_places=2)
    discount_price = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    sized = models.BooleanField(default=False)
    title = models.CharField(max_length=50, null=True, blank=True)
    material = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __init__(self, *args, **kwargs):
        self.variant_name = kwargs.pop('variant') if 'variant' in kwargs else None
        self.image = kwargs.pop('image') if 'image' in kwargs else None
        super(Product, self).__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        created = self.pk is None
        self.name = self.name or self.collection.name
        super(Product, self).save(*args, **kwargs)

        if created:
            variant = Variant.objects.create(product=self, is_default=True)
            variant.name = self.variant_name or variant.name
            variant.save()

            image = Image.objects.create(variant=variant, ordering=1)
            image.image = self.image or image.image
            image.save()

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        ordering = ['-created_at']


class Variant(models.Model):
    name = models.CharField(max_length=50, default='default')
    product = models.ForeignKey(Product, related_name='variants', on_delete=models.CASCADE)
    is_default = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        created = self.pk is None
        super(Variant, self).save(*args, **kwargs)

        if created:
            sizes = Size.SIZES if self.product.sized else [Size.NA]
            for size_name in sizes:
                Size.objects.create(size=size_name, variant=self)

    def __str__(self) -> str:
        return f'{self.product} - {self.name}'


class Image(models.Model):
    IMAGES_PATH = 'product_images'
    DEFAULT_IMAGE = 'default_product_image.png'

    def get_upload_path(self, filename):
        return settings.MEDIA_ROOT/Image.IMAGES_PATH/self.variant.product.category.name/filename

    image = models.ImageField(
        upload_to=lambda instance, filename: instance.get_upload_path(filename),
        default=f'{IMAGES_PATH}/{DEFAULT_IMAGE}')
    variant = models.ForeignKey(Variant, related_name='images', on_delete=models.CASCADE)
    ordering = models.PositiveIntegerField()

    @property
    def product(self):
        return self.variant.product

    def __str__(self) -> str:
        return f'{self.variant} image'

    class Meta:
        unique_together = [('ordering', 'variant')]
        ordering = ['ordering']


class Size(models.Model):
    NA = ('NA', 'Not Applicable')
    SIZES = [
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
    ]
    size = models.CharField(choices=SIZES+[NA], max_length=50, default=NA)
    variant = models.ForeignKey(Variant, related_name='sizes', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)

    def __str__(self) -> str:
        return f'{self.variant} - {self.size}: {self.quantity}'
