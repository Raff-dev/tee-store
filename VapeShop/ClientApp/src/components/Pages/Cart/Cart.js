import React, { useState, useEffect } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { CartList } from './CartList'
import { CartMenu } from './CartMenu'

const Cart = () => {
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
};

const Title = styled.span`
    font-size: 1.2rem;
    font-weight:500;
`;


export default Cart;