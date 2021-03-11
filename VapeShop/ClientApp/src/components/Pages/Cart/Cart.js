import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-bootstrap';

import { Text, PageSection, PageTitle, Button } from '../../utilities/ThemeComponents'

import { CartContext } from '../../../contexts/CartContext'
import { ApiContext } from '../../../contexts/ApiContext'

import { CartSummary } from './CartSummary'
import { CartMenu } from './CartMenu'
import { Resource } from '../../utilities/Resource';

const Cart = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    return (
        <PageSection>
            <Resource path={api.cartProducts} data={{ ids: cart.ids }} >
                {({ payload, loading }) => {
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
};

const Title = styled.span`
    font-size: 1.2rem;
    font-weight:500;
`;

export default Cart;