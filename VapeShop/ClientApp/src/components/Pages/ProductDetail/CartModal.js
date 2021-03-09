import React, { useContext } from 'react'

import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import { withRouter } from "react-router-dom";

import { Button } from '../../utilities/ThemeComponents';

import { CartContext } from '../../../contexts/CartContext'
import { ApiContext } from '../../../contexts/ApiContext'

import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';
import { CartSummary } from '../Cart/CartSummary';
import { Grid } from '@material-ui/core';

export const CartModal = withRouter(({ history, isOpen, closeCartModal }) => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);
    const ids = { ids: Object.keys(cart.quantityMap) };

    const proceedToCart = () => {
        closeCartModal();
        history.push("/Cart");
    }

    if (!isOpen) {
        return <div></div>
    }
    return (
        <Resource path={api.cartProducts} data={ids} disabled={!isOpen}>
            {({ payload, loading }) => {
                return (
                    <Background>
                        <ModalMenu md={{ span: 2, offset: 2 }}>
                            <Grid className="px-2">
                                <div onClick={closeCartModal}>
                                    CLOSE
                                </div>
                            </Grid>
                            <Grid className="px-2">
                                <Loadable loading={loading}>
                                    <CartSummary cartProducts={payload} />
                                </Loadable>
                            </Grid>
                            <Grid className="px-2">
                                <Button className="mt-2" secondary onClick={closeCartModal}>
                                    CONTINUE SHOPPING
                                </Button>
                                <Button className="mt-2" primary onClick={proceedToCart}>
                                    PROCEED TO CART
                                </Button>
                            </Grid>
                        </ModalMenu>
                    </Background>
                );
            }}
        </Resource>
    );
})

const ModalMenu = styled(Col)`
    background-color:white;
    background-image:white;
`;

const Background = styled.div`
    z-index:10;
    position:absolute;
    top:0;
    left :0;
    width:100vw;
    height:100vh;
    background-color: rgba(0,0,0,0.2);
    display: ${props => props.isOpen ? 'hidden' : 'flex'};
    animation: fadeIn 0.4s forwards;

    @-webkit-keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
        
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
`;