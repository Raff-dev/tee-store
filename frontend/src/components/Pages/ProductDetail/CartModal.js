import React, { useContext } from 'react'

import styled from 'styled-components';
import { Grid } from '@material-ui/core'
import { withRouter } from "react-router-dom";

import { Button, PageTitle } from '../../utilities/ThemeComponents';

import { CartContext } from '../../../contexts/CartContext'
import { ApiContext } from '../../../contexts/ApiContext'

import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';
import { CartSummary } from '../Cart/CartSummary';
import { theme } from '../../../contexts/ThemeContext';

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
        <Background>
            <Resource path={api.cartProducts} data={ids} disabled={!isOpen}>
                {({ payload, loading }) => {
                    if (!loading && payload.length === 0) {
                        closeCartModal();
                    }

                    return (
                        <ModalMenu md={{ span: 2, offset: 2 }}>
                            <Grid className="px-4">
                                <div >
                                    <PageTitle className="p-4 d-flex justify-content-between">
                                        <div>Cart</div>
                                        <CloseButton onClick={closeCartModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                                            </svg>
                                        </CloseButton>
                                    </PageTitle>
                                </div>
                                <Loadable loading={loading}>
                                    <CartSummary cartProducts={payload} />
                                </Loadable>
                                <Button className="mt-2" secondary onClick={closeCartModal}>
                                    CONTINUE SHOPPING
                                </Button>
                                <Button className="mt-2" primary onClick={proceedToCart}>
                                    PROCEED TO CART
                                </Button>
                            </Grid>
                        </ModalMenu>
                    );
                }}
            </Resource>
        </Background>
    );
})

const CloseButton = styled.div`
    :hover{
        cursor:pointer;
        opacity:0.6;
    }

`;

const ModalMenu = styled(Grid)`
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
    border-right: 1px solid ${theme.borderPrimary};
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