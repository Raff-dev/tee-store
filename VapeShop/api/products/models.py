from django.db import models
from django.db.models.base import Model
from django.db.models.fields.files import ImageField


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __repr__(self) -> str:
        return f'{self.name}'


class Product(models.Model):
    name = models.CharField(max_length=50)

    price = models.DecimalField(max_digits=5, decimal_places=2)
    discount_price = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    fabric = models.TextField()
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __repr__(self) -> str:
        return f'{self.name}'

    class Meta:
        ordering = ['-created_at']


class Size(models.Model):
    SIZES = [
        ('NA', 'Not Applicable')
        ('XS', 'Extra Small'),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
    ]
    size = models.CharField(choices=SIZES, max_length=50)
    product = models.ForeignKey(Product, related_name='sizes', on_delete=models.CASCADE)


class Variant(models.Model):
    name = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    size = models.ForeignKey(Size, related_name='variants', on_delete=models.CASCADE)

    @property
    def product(self):
        return self.size.product


class Image(models.Model):
    image = models.ImageField(upload_to='images')
    variant = models.ForeignKey(Variant, related_name='images', on_delete=models.CASCADE)
    ordering = models.IntegerField()

    @property
    def product(self):
        return self.variant.size.product

    class Meta:
        unique_together = [('ordering', 'variant')]
        ordering = ['ordering']
