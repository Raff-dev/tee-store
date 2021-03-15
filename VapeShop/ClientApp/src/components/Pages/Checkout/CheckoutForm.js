import React, { useContext } from 'react';
import axios from 'axios'
import { useStripe, useElements, P24BankElement } from '@stripe/react-stripe-js';

import { Grid, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

import { Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'
import { theme } from '../../../contexts/ThemeContext';
import { countryOptions } from './CountryOptions'

export const CheckoutForm = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (stripe && elements) {
            const formData = new FormData(event.target);
            const formDataObj = Object.fromEntries(formData.entries());
            getPaymentSession().then(paymentSession => confirmPayment(paymentSession, formDataObj));
        }
    };

    const getPaymentSession = async () => {
        return await axios.post(api.checkout, cart.quantityMap)
            .then(res => res.data['clientSecret']);

    }

    const confirmPayment = async (paymentSession, formDataObj) => {
        const p24 = elements.getElement(P24BankElement);
        console.log(p24);
        if (!p24) {
            alert('You need to select a payment method');
            return;
        }

        const { error } = await stripe.confirmP24Payment(paymentSession, {
            payment_method: {
                p24: p24,
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
                    tos_shown_and_accepted: formDataObj['agreement'] == 'on',
                }
            },
            return_url: 'https://your-website.com/checkout/complete',
        });

        if (error) {
            console.log(error.message);
        }
    }

    return (
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} xs={6}>
                        <Label>First Name</Label>
                        <Form.Control type="text" name="firstName" placeholder="First Name" required />
                    </Form.Group>

                    <Form.Group as={Col} xs={6}>
                        <Label>Last Name</Label>
                        <Form.Control type="text" name="lastName" placeholder="Last Name" required />
                    </Form.Group>
                </Form.Row>

                <Form.Group >
                    <Label>Email</Label>
                    <Form.Control type="email" name="email" placeholder="Email" required />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} xs={8}>
                        <Label>Address</Label>
                        <Form.Control placeholder="Address" name="address1" required />
                    </Form.Group>
                    <Form.Group as={Col} xs={4}>
                        <Label>Apt. / Suite</Label>
                        <Form.Control placeholder="Apt. / Suite" name="address2" required />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} xs={3}>
                        <Label>Country</Label>
                        <Form.Control name="country" as="select" placeholder="Country" required>
                            {countryOptions.map((country, index) =>
                                <option key={index} value={country}>{country}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} xs={6}>
                        <Label>City</Label>
                        <Form.Control name="city" placeholder="City" required />
                    </Form.Group>
                    <Form.Group as={Col} xs={3}>
                        <Label>Zip</Label>
                        <Form.Control name="postalCode" placeholder="ZIP" required />
                    </Form.Group>
                </Form.Row>


                <Form.Row className="d-block ml-1">
                    <Form.Group as={Col}>
                        <Label>Payment Method</Label>
                        <StyledP24BankElement className="mt-2" options={P24_ELEMENT_OPTIONS} required />
                        <Form.Control.Feedback type="invalid">
                            Please choose a payment method.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} >
                        <Checkbox className="d-flex">
                            <Form.Check classname="p-0 mr-2" type="checkbox" name="agreement" required />
                            <label>I agree to the <a href="/PrivacyPolicy">Privacy Policy</a> and <a href="/Terms">Purchaser Terms & Conditions</a></label>
                        </Checkbox>
                    </Form.Group>
                </Form.Row>

                <Button primary type="submit" className="mb-2" disabled={!stripe} >
                    CONTINUE TO PAYMENT
                </Button>
            </Form>
        </FormContainer >
    );
};

const Label = styled.span`
    font-weight:600;
    color: ${props => theme.textInfo};
    text-transform:lowercase;
    opacity:0.9;
    font-variant:small-caps;
`;

const P24_ELEMENT_OPTIONS = {
    value: 'blik',
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

const StyledP24BankElement = styled(P24BankElement)`
    height: 40px;
    width:100%;

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

const Checkbox = styled.div`
    label{
        margin-left:10px;
    }
`;

const FormContainer = styled(Grid)`

`;
