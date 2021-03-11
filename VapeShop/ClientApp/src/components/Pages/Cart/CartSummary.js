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
                            <p>{product.collection}</p>
                            <p>{product.title}</p>
                            <p>{cart.currency}{product.properties}</p>
                        </div>
                    </ProductDisplay>

                    <QuantityMenu>
                        <ButtonGroup variant="contained" color="primary" >
                            <Button onClick={() => {
                                cart.updateItem(product.id, cart.quantityMap[product.id] - 1)
                            }}>
                                -
                            </Button>
                            <Input
                                type="number"
                                value={cart.quantityMap[product.id]}
                            />
                            <Button onClick={() => cart.addItem(product.id)}>
                                +
                            </Button>
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
    border:none;
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
`;