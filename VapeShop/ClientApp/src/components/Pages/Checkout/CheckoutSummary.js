import React, { useContext } from 'react';
import styled from 'styled-components';

import { Text, PageSection, PageTitle, ListEntry, Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'

import { Resource } from '../../utilities/Resource'

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

const ProductImage = styled.img`
    width:100px;
`;
const ProductDisplay = styled.div`
    display: flex;
`;


