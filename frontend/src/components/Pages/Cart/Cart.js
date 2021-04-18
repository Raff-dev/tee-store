import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';

import { PageSection, PageTitle } from '../../utilities/ThemeComponents'

import { CartContext } from '../../../contexts/CartContext'
import { ApiContext } from '../../../contexts/ApiContext'

import { CartSummary } from './CartSummary'
import { CartMenu } from './CartMenu'
import { Resource } from '../../utilities/Resource';
import { CartEmpty } from './EmptyCart';

const Cart = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    return (
        <PageSection>
            <Resource path={api.cartProducts} data={{ ids: cart.ids }} >
                {({ payload, loading }) => {
                    if (!loading && payload.length === 0) {
                        return <CartEmpty />
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
}

export default Cart;