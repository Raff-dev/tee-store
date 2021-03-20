from django.db import models
from products.models import Instance


class Order(models.Model):
    STATUSES = [
        ('pending', 'pending'),
        ('complete', 'complete'),
        ('rejected', 'rejected'),
        ('reclamation', 'reclamation'),
    ]

    payment_id = models.TextField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.TextField(choices=STATUSES)

    invoice = models.FileField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=11)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    address = models.CharField(max_length=50)


class OrderLine(models.Model):
    order = models.ForeignKey(Instance, related_name='lines', on_delete=models.CASCADE)
    cost = models.DecimalField()
    quantity = models.IntegerField()
    title = models.CharField(max_length=50)
    amount = models.DecimalField()
    product = models.ForeignKey(Instance, null=True, blank=True)

    @property
    def amount(self) -> float:
        return self.cost*self.quantity

    def __str__(self) -> str:
        return f'{self.order} line'
