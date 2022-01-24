from functools import reduce
import json
from django.conf import settings
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import action
import stripe


from .models import Order, OrderLine
from api.settings import env
from products.models import Instance


class OrderViewSet(viewsets.GenericViewSet):
    queryset = Order.objects.all()

    @action(methods=['POST'], detail=False)
    def create_payment_session(self, request, *args, **kwargs):
        stripe.api_key = env('STRIPE_SECRET_KEY')
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
                payment=intent['id'],
            )

            data = {'clientSecret': intent['client_secret']}
            return Response(data, status.HTTP_202_ACCEPTED)
        except KeyError:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def confirm_payment(self, request, *args, **kwargs):
        stripe.api_key = env('STRIPE_SECRET_KEY')
        payload = json.loads(request.body)
        data = payload['data']
        payment_id = data['object']['id']

        try:
            event = stripe.Webhook.construct_event(
                request.body,
                request.META['HTTP_STRIPE_SIGNATURE'],
                env('STRIPE_ENDPOINT_SECRET')
            )

            order = Order.objects.filter(payment=payment_id).first()
            if event['type'] == 'payment_intent.succeeded':
                order.complete(data)
                order.send_invoice_email()
            elif event['type'] == 'payment_intent.payment_failed':
                order.status = Order.Status.FAILED
                order.save()

            return HttpResponse(status=status.HTTP_200_OK)

        except (ValueError, KeyError) as e:
            print(f'payload error: {e}')
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.SignatureVerificationError as e:
            print(f'signature error: {e}')
            return HttpResponse(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['POST'], detail=False)
    def email(self, request, *args, **kwargs):
        order = Order.objects.exclude(invoice__in=['', None], email__in=['', None]).first()
        order.send_invoice_email()
        return HttpResponse(status=status.HTTP_200_OK)
