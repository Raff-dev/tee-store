import React, { useContext } from 'react';
import { withRouter } from "react-router-dom";

import styled from 'styled-components';
import { Text, PageSection, PageTitle, ListEntry, Button } from '../../utilities/ThemeComponents'

import { CartContext } from '../../../contexts/CartContext';

import { Loadable } from '../../utilities/Loadable';

export const CartMenu = withRouter(({ history, cartProducts, loading }) => {
    const cart = useContext(CartContext);
    const subtotal = cart.subtotal(cartProducts);
    const total = Math.round((cart.shipping + subtotal) * 100) / 100;

    return (
        <Container className="px-4 py-3">
            <h4>
                <ListEntry>
                    <Text >Subtotal</Text>
                    <Loadable loading={loading}>
                        <Text info>{cart.currency}{subtotal}</Text>
                    </Loadable>
                </ListEntry>
                <ListEntry>
                    <Text >Shipping</Text>
                    <Loadable loading={loading}>
                        <Text info>{cart.currency}{cart.shipping}</Text>
                    </Loadable>
                </ListEntry>
                <ListEntry>
                    <Text className="font-weight-bold">Total</Text>
                    <Loadable loading={loading}>
                        <Text className="font-weight-bold">{cart.currency}{total}</Text>
                    </Loadable>
                </ListEntry>
            </h4>
            <Button primary className="mt-4" onClick={() => history.push('/Checkout')}>
                CHECKOUT
            </Button>
        </Container>
    );
})


const Container = styled.div`
    background-color:#f8fafc;
`;