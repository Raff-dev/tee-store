import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import { Text, PageSection, PageTitle, Button } from '../../utilities/ThemeComponents'

import { CartContext } from '../../../contexts/CartContext'
import { ApiContext } from '../../../contexts/ApiContext'

import { CartSummary } from './CartSummary'
import { CartMenu } from './CartMenu'
import { Resource } from '../../utilities/Resource';

const Cart = withRouter(({ history }) => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    return (
        <PageSection>
            <Resource path={api.cartProducts} data={{ ids: cart.ids }} >
                {({ payload, loading }) => {
                    if (payload.length === 0) {
                        return (
                            <Row className="justify-content-center">
                                <Col sm={12} md={4} lg={3} className="py-3 text-center">
                                    <Text info className="font-weight-bold py-3"><h4>Your cart is empty</h4></Text>
                                    <Button primary onClick={() => history.push('/')}>Go Shopping</Button>
                                </Col>
                            </Row>
                        );
                    }

                    return (
                        <div>
                            <Row>
                                <PageTitle>YOUR CART</PageTitle>
                            </Row>
                            <Row>
                                <Col lg={8} md={12}>
                                    <CartSummary cartProducts={payload} loading={loading} />
                                </Col>
                                <Col lg={4} md={12}>
                                    <CartMenu cartProducts={payload} loading={loading} />
                                </Col>
                            </Row>
                            <Row>
                                PROPOSED ITEMS
                            </Row>
                        </div>
                    );
                }}
            </Resource>
        </PageSection>
    );
});

export default Cart;