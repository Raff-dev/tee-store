import React, { useContext, useEffect, useRef } from 'react';

import styled from 'styled-components';
import { ButtonGroup, } from '@material-ui/core';

import { Text, ListEntry, Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'


export const CartSummary = ({ cartProducts }) => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);
    const inputRefs = useRef([]);

    useEffect(() => {
        cartProducts.map((product, index) =>
            inputRefs.current[index].value = cart.quantityMap[product.id])
    }, [cartProducts]);

    const changeProductAmount = (id, event, index) => {
        let amount = parseInt(event.target.value, 10);
        console.log('amount' + amount)
        if (amount >= 0) {
            cart.updateItem(id, amount);
        } else {
            inputRefs.current[index].value = cart.quantityMap[id];
        }
    }

    return (
        <section>
            {cartProducts.map((product, index) =>
                <ListEntry>
                    <ProductDisplay >
                        <ProductImage src={api.baseUrl + product.image} />
                        <div className="d-md-flex d-block justify-content-between w-100">
                            <div>
                                <p>
                                    <a href={`/Product/${product.product_id}/${product.variant}`}>
                                        <Text className="font-weight-bold">{product.collection}</Text>
                                    </a>
                                </p>
                                <p>
                                    <Text muted>
                                        {product.title}
                                    </Text>
                                </p>
                                <p>
                                    <Text>{cart.currency}{`${product.price} - ${product.variant_name} - ${product.size_label}`}</Text>
                                </p>
                            </div>

                            <QuantityMenu >
                                <ButtonGroup variant="contained" color="primary" >
                                    <QuantityButton onClick={() => {
                                        cart.updateItem(product.id, cart.quantityMap[product.id] - 1);
                                        inputRefs.current[index].value = cart.quantityMap[product.id] - 1;
                                    }}>
                                        -
                                    </QuantityButton>
                                    <Input
                                        ref={el => inputRefs.current[index] = el}
                                        type="number"
                                        defaultValue={cart.quantityMap[product.id]}
                                        onBlur={(e) => {
                                            changeProductAmount(product.id, e, index)
                                        }}
                                    />
                                    <QuantityButton onClick={() => {
                                        cart.addItem(product.id)
                                        inputRefs.current[index].value = cart.quantityMap[product.id] + 1;
                                    }}>
                                        +
                                    </QuantityButton>
                                </ButtonGroup>
                                <RemoveButton onClick={() => cart.removeItem(product.id)}>
                                    Remove
                                </RemoveButton>
                            </QuantityMenu>
                        </div>
                    </ProductDisplay>
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
    width:80px;
    height:max-content;
`;

const ProductDisplay = styled.div`
    display: flex;
    justify-content: flex-start;
    width:100%;
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
    width:min-content;
`;