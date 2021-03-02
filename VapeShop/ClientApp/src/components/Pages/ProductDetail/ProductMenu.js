import React from 'react';
import { Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

export const ProductMenu = ({ product, variant }) => {
    console.log(product);
    return (
        <section>
            <p>Price</p>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <br />
            <p>Color</p>
            {product.variants.map((variant, index) =>
                <div key={index}>
                    <span>{variant.name}</span>
                </div>
            )}
            <br />
            <Form>
                <Form.Row className="align-items-center">
                    <Col xs="auto" className="my-1">
                        <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                            Preference
                        </Form.Label>
                        <Form.Control
                            as="select"
                            className="mr-sm-2"
                            id="inlineFormCustomSelect"
                            custom
                        >
                            <option value="0">Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Control>
                    </Col>
                    <Col xs="auto" className="my-1">
                        <Button type="submit" variant="success">ADD TO CART</Button>
                    </Col>
                </Form.Row>
            </Form>
        </section>
    );
}