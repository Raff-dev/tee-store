import React, { useContext } from 'react';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-bootstrap';

import { CartContext } from '../../../contexts/CartContext'
import { ApiContext } from '../../../contexts/ApiContext'
import { CartSummary } from './CartSummary'
import { CartMenu } from './CartMenu'
import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';

const Cart = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    return (
        <Resource path={api.cartProducts} data={{ ids: cart.ids }} >
            {({ payload, loading }) => {
                return (
                    <Loadable loading={loading}>
                        <Grid>
                            <Col lg={8} md={12}>
                                <Title>YOUR CART</Title>
                                <CartSummary cartProducts={payload} />
                            </Col>
                            <Col lg={4} md={12}>
                                <CartMenu cartProducts={payload} />
                            </Col>
                        </Grid>
                        <Grid>
                            <Row>
                                PROPOSED ITEMS
                            </Row>
                        </Grid>
                    </Loadable>
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