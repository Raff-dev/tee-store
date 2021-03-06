import React, { useContext } from 'react';

import styled from 'styled-components';
import { ButtonGroup, Button } from '@material-ui/core';

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'

export const CartList = ({ cartProducts }) => {
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
                            <p>${product.properties}</p>
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
    :hover{
        cursor: pointer;
        text-decoration:underline;
    }
`;

const ListEntry = styled.div`
    display:flex;
    justify-content:space-between
`;

const ProductImage = styled.img`
    width:100px;

`;
const ProductDisplay = styled.div`
    display: flex;
`;


const Input = styled.input`
`;

const QuantityMenu = styled.div`
`;