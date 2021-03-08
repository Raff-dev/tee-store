import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CartContext } from '../../../contexts/CartContext';

const CheckoutComplete = (props) => {
    console.log(props)
    const cart = useContext(CartContext);
    useEffect(cart.clearItems, []);

    return (
        <Grid className="d-flex justify-content-center pt-4">
            <Col md={4}>
                <div className="text-center">
                    <p>
                        <b>
                            Thank you for your purcharse!
                        </b>
                    </p>
                </div>
                <Form >
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center">
                        <Button type="submit">
                            SIGN UP FOR NEWSLETTER
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Grid>
    );
};

export default CheckoutComplete;