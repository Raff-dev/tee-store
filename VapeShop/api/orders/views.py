from functools import reduce
import json
from django.core.files import File
from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import action
from django.template import Context, loader
from django.core.mail import send_mail
import stripe
import pdfkit
import urllib

from .models import Order, OrderLine
from products.models import Instance


class OrderViewSet(viewsets.GenericViewSet):
    queryset = Order.objects.all()
    INVOICE_TEMPLATE = 'invoice_template.html'

    @action(methods=['POST'], detail=False)
    def create_payment_session(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        try:
            ids = [int(id) for id in request.data.keys()]
            instances = Instance.objects.filter(id__in=ids)
            instances_quantity = {
                instance: request.data[str(instance.id)]
                for instance in instances
            }

            amount = int(reduce(
                lambda total, instance: total+instance.price*instances_quantity[instance]*100,
                instances,
                int(OrderLine.SHIPPING_COST*100)
            ))

            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='eur',
                payment_method_types=['p24'],
            )

            Order.objects.create(
                instances=instances_quantity,
                payment_id=intent['id'],
            )

            data = {'clientSecret': intent['client_secret']}
            return Response(data, status.HTTP_202_ACCEPTED)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def confirm_payment(self, request, *args, **kwargs):
        stripe.api_key = settings.STRIPE_SECRET_KEY
        payload = request.body
        data = json.loads(payload)['data']
        payment_id = data['object']['id']
        # print(json.dumps(json.loads(payload), indent=4, sort_keys=True))

        try:
            event = stripe.Webhook.construct_event(
                payload,
                request.META['HTTP_STRIPE_SIGNATURE'],
                settings.STRIPE_ENDPOINT_SECRET
            )
            print(f"EVENT TYPE: {event['type']}")
            if event['type'] == 'payment_intent.succeeded':
                print("Payment was successful.")
                self.complete_order(payment_id, data)
            return HttpResponse(status=status.HTTP_200_OK)
        except (ValueError, KeyError) as e:
            print(f'payload error: {e}')
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.SignatureVerificationError as e:
            print(f'signature error: {e}')
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    def complete_order(self, payment_id, data):
        billing_details = data['object']['charges']['data'][0]['billing_details']
        billing_details = self.decode_url(billing_details)
        address_info = billing_details.pop('address')
        address = ' '.join([address_info.pop('line1'), address_info.pop('line2')])
        order = Order.objects.filter(payment_id=payment_id).first()

        invoice, filename = self.generate_invoice_pdf(order, self.INVOICE_TEMPLATE)
        order.invoice.save(name=filename, content=File(invoice))
        order.__dict__.update(
            address=address,
            **billing_details,
            **address_info
        ).save()

    def decode_url(self, obj):
        """decodes url encoded dictionary object"""
        for key, value in obj.items():
            if isinstance(value, dict):
                obj[key] = self.decode_url(value)
            else:
                obj[key] = value and urllib.parse.unquote(value)
        return obj

    def generate_invoice_pdf(self, order, invoice_template):
        template = loader.get_template(invoice_template)
        options = {'enable-local-file-access': None}
        context = {'order': order, 'lines': order.lines.all()}
        filename = self.get_invoice_name(order)
        invoice_html = template.render(context)
        invoice_pdf = pdfkit.from_string(invoice_html, filename, options=options)
        return invoice_pdf, filename

    def get_invoice_name(self, order):
        return f"{str(order).replace(' ', '_')}.pdf"
