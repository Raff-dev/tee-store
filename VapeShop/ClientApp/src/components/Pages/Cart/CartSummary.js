import React, { useContext, useRef } from 'react';

import styled from 'styled-components';
import { ButtonGroup, } from '@material-ui/core';

import { Text, PageSection, PageTitle, ListEntry, Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'

import { Loadable } from '../../utilities/Loadable';

export const CartSummary = ({ cartProducts }) => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);
    const inputRefs = [];

    for (let i = 0; i < cartProducts.length; i++) {
        let ref = useRef();
        inputRefs.push(ref);
    }

    const changeProductAmount = (id, event, index) => {
        let amount = parseInt(event.target.value, 10);
        console.log('amount' + amount)
        if (amount >= 0) {
            cart.updateItem(id, amount);
        } else {
            inputRefs[index].current.value = cart.quantityMap[id];
        }
    }

    return (
        <section>
            {cartProducts.map((product, index) =>
                <ListEntry>
                    <ProductDisplay>
                        <ProductImage src={api.baseUrl + product.image} />
                        <div>
                            <p>
                                <Text className="font-weight-bold">{product.collection}</Text>
                            </p>
                            <p>
                                <Text muted>{product.title}</Text>
                            </p>
                            <p>
                                <Text>{cart.currency}{`${product.price} - ${product.variant} - ${product.size_label}`}</Text>
                            </p>
                        </div>
                    </ProductDisplay>

                    <QuantityMenu >
                        <ButtonGroup variant="contained" color="primary" >
                            <QuantityButton onClick={() => {
                                cart.updateItem(product.id, cart.quantityMap[product.id] - 1);
                                inputRefs[index].current.value = cart.quantityMap[product.id] - 1;
                            }}>
                                -
                            </QuantityButton>
                            <Input
                                ref={inputRefs[index]}
                                type="number"
                                defaultValue={cart.quantityMap[product.id]}
                                onBlur={(e) => {
                                    changeProductAmount(product.id, e, index)
                                }}
                            />
                            <QuantityButton onClick={() => {
                                cart.addItem(product.id)
                                inputRefs[index].current.value = cart.quantityMap[product.id] + 1;
                            }}>
                                +
                            </QuantityButton>
                        </ButtonGroup>
                        <RemoveButton onClick={() => cart.removeItem(product.id)}>
                            Remove
                        </RemoveButton>
                    </QuantityMenu>
                </ListEntry>
            )}
        </section>
    );
}
const QuantityButton = styled(Button)`
    outline: none;
    border:none !important;
`;

const RemoveButton = styled.div`
    display:flex;
    justify-content:center;
    padding-top:5px;
    :hover{
        cursor: pointer;
        text-decoration:underline;
    }
`;

const ProductImage = styled.img`
    width:100px;
`;
const ProductDisplay = styled.div`
    display: flex;
`;

const Input = styled.input`
    border:none !important;
    width:50px;
    text-align:center;
    border-color:transparent;
    outline:none;
    -moz-appearance: textfield;
    :-webkit-outer-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    :-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
`;

const QuantityMenu = styled.div`
    border:none;
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }
`;