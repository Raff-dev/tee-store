from functools import reduce
from django.db import models
from products.models import Instance


class Order(models.Model):
    STATUSES = [
        ('created', 'created'),
        ('pending', 'pending'),
        ('failed', 'failed'),
        ('succesful', 'succesful'),
        ('reclamation', 'reclamation'),
    ]

    payment_id = models.CharField(unique=True, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.TextField(default='pending', choices=STATUSES)

    invoice = models.FileField(blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=11, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=50, blank=True, null=True)
    state = models.CharField(max_length=50, blank=True, null=True)
    postal_code = models.CharField(max_length=10, blank=True, null=True)
    address = models.CharField(max_length=100, blank=True, null=True)

    def __init__(self, *args, **kwargs):
        self.instances = kwargs.pop('instances') if 'instances' in kwargs else {}
        super(Order, self).__init__(*args, **kwargs)

    def save(self, *args, **kwargs):
        created = self.pk is None
        super(Order, self).save(*args, **kwargs)

        if created:
            for instance, quantity in self.instances.items():
                OrderLine.objects.create(
                    order=self,
                    cost=instance.price,
                    quantity=quantity,
                    title=instance.name,
                    product=instance
                )
            shipping_line = OrderLine.create_shipping_line(self)
            shipping_line.order = self
            shipping_line.save()

    def __str__(self) -> str:
        return f'Invoice_{self.pk} {self.created_at.date()}'

    @property
    def amount(self):
        return reduce(lambda total, line: total+line.amount, self.lines.all(), 0)


class OrderLine(models.Model):
    SHIPPING_COST = 14.99
    SHIPPING_TITLE = 'Shipping'

    order = models.ForeignKey(Order, related_name='lines', on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.IntegerField(default=1)
    title = models.CharField(max_length=50)
    product = models.ForeignKey(Instance, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.order} line'

    @property
    def amount(self) -> float:
        return self.cost*self.quantity

    @classmethod
    def create_shipping_line(cls, order):
        return cls(cost=cls.SHIPPING_COST, title=cls.SHIPPING_TITLE)
