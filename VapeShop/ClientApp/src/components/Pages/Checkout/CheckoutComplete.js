import { withRouter } from "react-router-dom";
import React, { useContext, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { CartContext } from '../../../contexts/CartContext';
import { Button, PageSection } from '../../utilities/ThemeComponents'

const CheckoutComplete = withRouter((props) => {
    console.log(props)
    const cart = useContext(CartContext);
    useEffect(cart.clearItems, []);

    return (
        <PageSection className="d-flex justify-content-center pt-4">
            <Col md={4}>
                <div className="text-center">
                    <p>
                        <b>
                            Thank you for your purcharse!
                        </b>
                    </p>
                </div>
                <Form >
                    <Form.Group className="pt-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center">
                        <Button primary type="submit">
                            SIGN UP FOR NEWSLETTER
                        </Button>
                    </Form.Group>
                    <Button type="submit" onClick={() => history.push('/')}>
                        GO SHOPPING
                    </Button>
                </Form>
            </Col>
        </PageSection>
    );
});

export default CheckoutComplete;