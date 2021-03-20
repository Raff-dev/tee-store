from functools import reduce
from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.template import Context, loader
from django.core.mail import send_mail
import stripe
import pdfkit
from products.models import Size


class OrderViewSet(viewsets.GenericViewSet):
    INVOICE_TEMPLATE = 'invoice_template.html'

    @action(methods=['POST'], detail=False)
    def create_payment_session(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            ids = [int(id) for id in request.data.keys()]
            sizes = Size.objects.filter(id__in=ids)
            amount = int(reduce(lambda total, size: total+size.price*request.data[str(size.id)]*100, sizes, 0))
            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='eur',
                payment_method_types=['p24'],
            )
            result = {'clientSecret': intent['client_secret']}
            return Response(result, status.HTTP_202_ACCEPTED)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def confirm_payment(self, request, *args, **kwargs):
        order = self.get_object()
        order.invoice = self.generate_invoice(order)

        pass

    def generate_invoice(self, order):
        template = loader.get_template(self.INVOICE_TEMPLATE)
        context = Context({
            'order': order
        })
        invoice_str = template.render(context)
        invoice_pdf = pdfkit.from_string(invoice_str)
        return invoice_pdf
