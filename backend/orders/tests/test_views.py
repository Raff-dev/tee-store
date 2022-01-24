from dataclasses import dataclass
import json
from unittest.mock import patch

from django.test import TestCase, Client
from rest_framework.status import HTTP_200_OK

from ..models import Order


class TestPaymentConfirm(TestCase):
    def setUp(self):
        self.url_confirm_payment = "/api/Orders/confirm_payment/"
        self.payment_id = 'payment_id'
        self.headers = {'HTTP_STRIPE_SIGNATURE': None}
        self.stripe_data = {
            "type": None,
            "data": {
                "object": {
                    "id": self.payment_id,
                    "charges": {
                        "data": [
                            {
                                "billing_details": {
                                    "address": {
                                        "city": "city",
                                        "country": "country",
                                        "line1": "address1",
                                        "line2": "address2",
                                        "postal_code": "00-420",
                                        "state": 'state'
                                    },
                                    "email": "test@gmail.invalid.com",
                                    "name": "name",
                                    "phone": '123123123'
                                },
                            }
                        ],
                    },
                }
            }
        }

        Order.objects.create(payment=self.payment_id)

    # replaces targeted object with a new, mock one
    @patch("stripe.Webhook.construct_event")
    def test_confirm_payment_succesfull(self, StripeEventMock):
        self.stripe_data['type'] = 'payment_intent.succeeded'

        StripeEventMock.return_value = self.stripe_data
        res = Client().post(self.url_confirm_payment, self.stripe_data, content_type="application/json", **self.headers)
        self.assertEquals(res.status_code, HTTP_200_OK)

        order = Order.objects.filter(payment=self.payment_id, status=Order.Status.SUCCESSFUL)
        self.assertTrue(order.exists())

    @patch("stripe.Webhook.construct_event")
    def test_confirm_payment_failed(self, StripeEventMock):
        self.stripe_data['type'] = 'payment_intent.payment_failed'

        StripeEventMock.return_value = self.stripe_data
        res = Client().post(self.url_confirm_payment, self.stripe_data, content_type="application/json", **self.headers)
        self.assertEquals(res.status_code, HTTP_200_OK)

        order = Order.objects.filter(payment=self.payment_id, status=Order.Status.FAILED)
        self.assertTrue(order.exists())
