import React, { useContext } from 'react';

import styled from 'styled-components';
import { ButtonGroup, } from '@material-ui/core';

import { Text, PageSection, PageTitle, ListEntry, Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'

import { Loadable } from '../../utilities/Loadable';

export const CartSummary = ({ cartProducts }) => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

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
                                cart.updateItem(product.id, cart.quantityMap[product.id] - 1)
                            }}>
                                -
                            </QuantityButton>
                            <Input
                                type="number"

                                value={cart.quantityMap[product.id]}
                            />
                            <QuantityButton onClick={() => cart.addItem(product.id)}>
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
    text-align:right;
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
`;