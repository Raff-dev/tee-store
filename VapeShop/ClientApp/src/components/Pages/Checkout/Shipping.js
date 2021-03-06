import React, { useRef } from 'react';
import { Grid, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';

export const Shipping = ({ onSubmit }) => {
    const buttonRef = useRef();
    const agreementChange = (event) => {
        console.log(event.target.value);
        buttonRef.current.disabled = !event.target.checked
        console.log('dis' + buttonRef.current.disabled)
    }
    return (
        <FormContainer>
            <Form onSubmit={onSubmit}>
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
                    <Form.Control placeholder="Address" name="addres1" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apt. / Suite" name="addres2" />
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

                <Form.Group id="formGridCheckbox">
                    <Form.Check type="checkbox" onChange={agreementChange} label="I agree to the terms & condition" name="agreement" />
                </Form.Group>

                <Button variant="primary" type="submit" ref={buttonRef} >
                    CONTINUE TO PAYMENT METHOD
                </Button>
            </Form>
        </FormContainer >
    );
};

const FormContainer = styled(Grid)`

`;
