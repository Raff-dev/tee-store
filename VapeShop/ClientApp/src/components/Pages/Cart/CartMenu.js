import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import styled from 'styled-components';

import { ApiContext } from '../../../contexts/ApiContext';
import { CartContext } from '../../../contexts/CartContext';

export const CartMenu = ({ cartProducts }) => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);
    const subtotal = cart.subtotal(cartProducts);
    return (
        <Container>
            <div>
                <span>Subtotal</span>
                <span>{subtotal}</span>
            </div>
            <div>
                <span>Shipping</span>
                <span>{cart.shipping}</span>
            </div>
            <div>
                <span>Total</span>
                <span>{cart.shipping + subtotal}</span>
            </div>
            <Checkout to="/Checkout">
                CHECKOUT
            </Checkout>
        </Container>
    );
}
const Checkout = styled(Link)`
    color: white;
    background-color: rgb(196, 131, 233);
    border: 1 solid rgba(196, 131, 233,0.6);
    border-radius:5px;
    text-align:center;
    padding: 12px;
    margin-top:30px;
    width:100%;
    font-size:1.2rem;
    font-weight: 300;
    font-family: system-ui;

    :hover{
        text-decoration:none;
        color:white;
        opacity:0.8;
        cursor:pointer;
    }
`;


const Container = styled.div`
    background-color:#3333;
`;