import React, { useContext } from 'react';
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { CartContext } from '../../../contexts/CartContext';
import { Text } from '../../utilities/ThemeComponents';

export const ProductsMesh = ({ products, category }) => {
    const cart = useContext(CartContext);

    return (
        <Mesh fluid className="p-md-2">
            {products.map((product, _) => {
                return (
                    (category === 'All products' || product.category === category) &&
                    product.variants.map((variant, _) =>
                        <Col sm={6} lg={4} key={variant.id}>
                            <Card to={`/Product/${product.id}/${variant.id}`}>
                                <Image src={variant.images[0].image} alt="variant image" />
                                <Text muted>{product.name}</Text>
                                <Text primary >
                                    <h4 className="font-weight-bold">{cart.currency}{product.price}</h4>
                                </Text>
                            </Card>
                        </Col>
                    )
                )
            })}
        </Mesh>
    );
}


const Image = styled.img`
    object-fit:contain;
    width:100%;
`;

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom:5vh;
    animation: fadeIn 0.4s forwards;

    @-webkit-keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
         
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

    &:hover {
        cursor: pointer;
        text-decoration:none;
    }
`;

const Mesh = styled(Row)`
    min-height:100vh;
    display:flex;
    justify-content:flex-start;
    max-width:1200px;
`;