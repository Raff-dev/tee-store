import React, { useContext } from 'react';
import axios from 'axios'
import { useStripe, useElements, P24BankElement } from '@stripe/react-stripe-js';

import { Grid, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

import { Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'


export const CheckoutForm = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    const stripe = useStripe();
    const elements = useElements();

    const getPaymentSession = async () => {
        console.log(api.checkout)
        return await axios.post(api.checkout, cart.quantityMap)
            .then(res => {
                console.log(res.data)
                return res.data['clientSecret']
            });

    }
    const confirmPayment = async (paymentSession, formDataObj) => {
        const p24Bank = elements.getElement(P24BankElement);

        const { error } = await stripe.confirmP24Payment(paymentSession, {
            payment_method: {
                p24: p24Bank,
                billing_details: {
                    address: {
                        city: formDataObj['city'],
                        country: formDataObj['country'],
                        line1: formDataObj['address1'],
                        line2: formDataObj['address2'],
                        postal_code: formDataObj['postalCode'],
                        state: formDataObj['state']
                    },
                    email: formDataObj['email'],
                    name: [formDataObj['firstName'], formDataObj['lastName']].join(' '),
                },
            },
            payment_method_options: {
                p24: {
                    // https://stripe.com/docs/payments/p24/accept-a-payment#requirements
                    tos_shown_and_accepted: true,
                }
            },
            return_url: 'https://your-website.com/checkout/complete',
        });
        if (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj)
        getPaymentSession()
            .then(paymentSession => confirmPayment(paymentSession, formDataObj));

    };
    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Last Name" />
                    </Form.Group>
                </Form.Row>

                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Email" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Address" name="address1" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Apt. / Suite</Form.Label>
                    <Form.Control placeholder="Apt. / Suite" name="address2" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>City</Form.Label>
                        <Form.Control name="city" placeholder="City" />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" placeholder="State" name="state" />
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Form.Label>Zip</Form.Label>
                        <Form.Control name="postalCode" placeholder="ZIP" />
                    </Form.Group>
                    <Form.Group as={Col} >
                        <Form.Label>Country</Form.Label>
                        <Form.Control name="country" placeholder="Country" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Label>Payment Method</Form.Label>
                    <P24BankSection />
                </Form.Row>

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" label="I agree to the terms & condition" name="agreement" />
                </Form.Group>
                <Button primary type="submit" disabled={!stripe} >
                    CONTINUE TO PAYMENT
                </Button>
            </Form>
        </FormContainer >
    );
};

const P24_ELEMENT_OPTIONS = {
    // Custom styling can be passed to options when creating an Element
    style: {
        base: {
            padding: '10px 12px',
            color: '#32325d',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            },
        },
    },
};

function P24BankSection() {
    return (
        <label>
            P24 Bank
            <StyledP24BankElement options={P24_ELEMENT_OPTIONS} />
        </label>
    );
};
const StyledP24BankElement = styled(P24BankElement)`
    height: 40px;
    width:400px;

    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;

    input {
    padding: 10px 12px;
    }

`;
const FormContainer = styled(Grid)`

`;
