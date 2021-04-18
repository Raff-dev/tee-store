import React, { useContext } from 'react';
import styled from 'styled-components';

import { Text, ListEntry } from '../../utilities/ThemeComponents'

import { CartContext } from '../../../contexts/CartContext'

import Badge from '@material-ui/core/Badge';
import { Loadable } from '../../utilities/Loadable';
import { theme } from '../../../contexts/ThemeContext';

export const CheckoutSummary = ({ cartProducts, loading }) => {
    const cart = useContext(CartContext);

    const subtotal = cart.subtotal(cartProducts);
    const total = Math.round((cart.shipping + subtotal) * 100) / 100;

    return (
        <Panel className="px-4">
            {cartProducts.map((product, index) =>
                <ListEntry key={index}>
                    <ProductDisplay>
                        <div className="d-flex">
                            <div>
                                <StyledBadge badgeContent={cart.quantityMap[product.id]} color="primary">
                                    <ProductImage >
                                        <img src={product.image} alt="product" />
                                    </ProductImage>
                                </StyledBadge>
                            </div>
                            <div className="px-3">

                                <p>
                                    <a href={`/Product/${product.product_id}/${product.variant}`}>
                                        <Text className="font-weight-bold">{product.collection}</Text>
                                    </a>
                                </p>
                                <Text muted>
                                    <p>{product.title}</p>
                                    <p>{`${product.variant_name} - ${product.size_label}`}</p>
                                </Text>
                            </div>
                        </div>
                        <div>
                            <Text className="font-size-bold pr-4 align-middle">{cart.currency}{product.price * cart.quantityMap[product.id]}</Text>
                        </div>
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
        </Panel>
    );
};

const Panel = styled.section`
    background-color: ${theme.bgPanel};
    padding:10px;
`;

const StyledBadge = styled(Badge)`
    background: #333 !important;
    background-color: #333 !important;
`;

const ProductImage = styled.div`
    border: 1px solid ${theme.borderSecondary};
    
    img{
        width:70px;
    }
`;

const ProductDisplay = styled.div`
    display: flex;
    justify-content: space-between;
    width:100%;
`;




