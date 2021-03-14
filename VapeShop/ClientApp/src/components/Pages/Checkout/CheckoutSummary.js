import React, { useContext } from 'react';
import styled from 'styled-components';

import { Text, PageSection, PageTitle, ListEntry, Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext'
import { CartContext } from '../../../contexts/CartContext'

import { Resource } from '../../utilities/Resource'
import Badge from '@material-ui/core/Badge';
import { theme } from '../../../contexts/ThemeContext'
import { Loadable } from '../../utilities/Loadable';

export const CheckoutSummary = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);


    return (
        <Resource path={api.cartProducts} data={{ ids: cart.ids }}>
            {({ payload, loading }) => {
                const subtotal = cart.subtotal(payload);
                const total = Math.round((cart.shipping + subtotal) * 100) / 100;

                return (
                    <section className="px-4">
                        {payload.map((product, index) =>
                            <ListEntry key={index}>
                                <ProductDisplay>
                                    <div className="d-flex">
                                        <div>
                                            <StyledBadge badgeContent={cart.quantityMap[product.id]} color="primary">
                                                <ProductImage src={api.baseUrl + product.image} />
                                            </StyledBadge>
                                        </div>
                                        <div>
                                            <p>{product.collection}</p>
                                            <Text muted>
                                                <p>{product.title}</p>
                                                <p>{`${product.variant} - ${product.size_label}`}</p>
                                            </Text>
                                        </div>
                                    </div>
                                    <p>
                                        <Text className="font-size-bold pr-4">{cart.currency}{product.price * cart.quantityMap[product.id]}</Text>
                                    </p>
                                </ProductDisplay>

                            </ListEntry>
                        )}
                        <h4>
                            <ListEntry>
                                <Text >Shipping Method</Text>
                                <Loadable loading={loading}>
                                    <Text info>Delivery</Text>
                                </Loadable>
                            </ListEntry>
                            <ListEntry>
                                <Text >Subtotal</Text>
                                <Loadable loading={loading}>
                                    <Text info>{cart.currency}{subtotal}</Text>
                                </Loadable>
                            </ListEntry>
                            <ListEntry>
                                <Text >Shipping</Text>
                                <Loadable loading={loading}>
                                    <Text info>{cart.currency}{cart.shipping}</Text>
                                </Loadable>
                            </ListEntry>
                            <ListEntry>
                                <Text className="font-weight-bold">Total</Text>
                                <Loadable loading={loading}>
                                    <Text className="font-weight-bold">{cart.currency}{total}</Text>
                                </Loadable>
                            </ListEntry>
                        </h4>
                    </section>
                );
            }}
        </Resource>
    );
};
const StyledBadge = styled(Badge)`
    background: #333 !important;
    background-color: #333 !important;
`;

const ProductImage = styled.img`
    width:70px;
`;
const ProductDisplay = styled.div`
    display: flex;
    justify-content: space-between;
    width:100%;
`;




