import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-bootstrap';

import { CartContext } from '../../../contexts/CartContext'
import { ApiContext } from '../../../contexts/ApiContext'
import { CartList } from './CartList'
import { CartMenu } from './CartMenu'
import { Resource } from '../../utilities/Resource';

const Cart = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);
    const ids = { ids: cart.ids };

    return (
        <Resource path={api.cart} data={ids} disabled={!!ids === false}>
            {({ payload, loading }) => {
                console.log(payload)
                console.log(cart)
                return (
                    <Grid>
                        <Row>
                            <Title>YOUR CART</Title>
                            <Col lg={8} md={12}>
                                <CartList />
                            </Col>
                            <Col lg={4} md={12}>
                                <CartMenu />
                            </Col>
                        </Row>
                        <Row>
                            PROPOSED ITEMS
                        </Row>
                    </Grid>
                );
            }}
        </Resource>
    );
};

const Title = styled.span`
    font-size: 1.2rem;
    font-weight:500;
`;

export default Cart;