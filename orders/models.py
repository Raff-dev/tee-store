from functools import reduce
from django.db import models
from django.conf import settings
from django.core.files.base import ContentFile
from django.template import loader
from django.core.mail import send_mail
from django.core.mail import EmailMessage
import pdfkit

from .helpers import decode_url
from products.models import Instance


class Order(models.Model):
    INVOICE_TEMPLATE = 'invoice.html'
    ORDER_EMAIL_TEMPLATE = 'order_email.html'
    INVOICE_ATTACHMENT_NAME = 'invoice.pdf'

    INVOICES_PATH = 'invoices'
    STATUSES = [
        ('Created', 'Created'),
        ('Pending', 'Pending'),
        ('Failed', 'Failed'),
        ('Succesful', 'Succesful'),
        ('Reclamation', 'Reclamation'),
    ]

    payment = models.CharField(unique=True, max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.TextField(default='pending', choices=STATUSES)

    invoice = models.FileField(upload_to=INVOICES_PATH, null=True)
    name = models.CharField(max_length=100, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=11, blank=True)
    country = models.CharField(max_length=50, blank=True)
    city = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    postal_code = models.CharField(max_length=10, blank=True)
    address = models.CharField(max_length=100, blank=True)

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

    @property
    def tax(self):
        return f'{(float(self.amount)*0.18):.2f}'

    @property
    def subtotal(self):
        return f'{(float(self.amount)-float(self.tax)):.2f}'

    def complete(self, data) -> None:
        billing_details = data['object']['charges']['data'][0]['billing_details']
        billing_details = decode_url(billing_details)
        address_info = billing_details.pop('address')
        address = ' '.join([address_info.pop('line1'), address_info.pop('line2')])
        self.__dict__.update(
            address=address,
            **billing_details,
            **address_info
        )
        self.save()
        filename = self.get_invoice_name()
        invoice = self.generate_invoice_pdf()
        self.invoice.save(
            name=filename,
            content=ContentFile(invoice),
            save=True
        )

    def generate_invoice_pdf(self) -> str:
        template = loader.get_template(self.INVOICE_TEMPLATE)
        options = {'enable-local-file-access': None}
        invoice_html = template.render({'order': self})
        invoice_pdf = pdfkit.from_string(invoice_html, False, options=options)
        return invoice_pdf

    def get_invoice_name(self) -> str:
        return f"{str(self).replace(' ', '_')}.pdf"

    def send_invoice_email(self) -> None:
        template = loader.get_template(self.ORDER_EMAIL_TEMPLATE)
        body = template.render({'order': self})
        email = EmailMessage(
            subject='Order confirmation ',
            body=body,
            from_email=settings.EMAIL_HOST_USER,
            to=[self.email],
        )
        email.attach(self.INVOICE_ATTACHMENT_NAME, self.invoice.read(), self.invoice.name)
        email.send(fail_silently=False)


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
