import React from 'react';
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-bootstrap';

import { ProductCard } from './ProductCard'

export const ProductsMesh = ({ products, category }) => {
    return (
        <Mesh xs={1} md={3} lg={4}>
            {products.map((product, _) => {
                return (
                    (category === 'All products' || product.category === category) &&
                    product.variants.map((variant, index) =>
                        <Col >
                            <ProductCard className="flex-wrap" product={product} variant={variant} key={variant.id} />
                        </Col>
                    )
                )
            }
            )}
        </Mesh>
    );
}

const Mesh = styled(Row)`
    min-height:100vh;
    display:flex;
    justify-content:center;

`;