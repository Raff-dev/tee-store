import React, { useContext } from 'react';
import styled from 'styled-components';

import { Resource } from '../../utilities/Resource'
import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'

export const CheckoutSummary = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);
    const ids = { ids: Object.keys(cart.quantityMap) };

    return (
        <Resource path={api.cartProducts} data={ids} disabled={!!ids['ids'] === false}>
            {({ payload, loading }) => {
                return (
                    <section>
                        {payload.map((product, index) =>
                            <ListEntry>
                                <ProductDisplay>
                                    <ProductImage src={api.baseUrl + product.image} />
                                    <div>
                                        <p>{product.collection}</p>
                                        <p>{product.title}</p>
                                        <p>${product.properties}</p>
                                        <p>{cart.quantityMap[product.id]}</p>
                                    </div>
                                </ProductDisplay>

                            </ListEntry>
                        )}
                    </section>
                );
            }}
        </Resource>
    );
};

const RemoveButton = styled.div`
    :hover{
        cursor: pointer;
        text-decoration:underline;
    }
`;

const ListEntry = styled.div`
    display:flex;
    justify-content:space-between;
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
