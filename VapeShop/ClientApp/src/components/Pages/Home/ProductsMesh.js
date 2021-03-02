import React from 'react';
import styled from 'styled-components'
import { Grid, Row, Col } from 'react-bootstrap';

import { ProductCard } from './ProductCard'

export const ProductsMesh = ({ products, category }) => {
    return (
        <Mesh>
            <Row>
                {products.map((product, _) =>
                    (category === 'All products' || product.category === category) &&
                    product.variants.map((variant, index) =>
                        <Col xs={6} md={4}>
                            <ProductCard product={product} variant={variant} key={variant.id} />
                        </Col>
                    )
                )}
            </Row>
        </Mesh>
    );
}

const Mesh = styled(Grid)`
    min-height:100vh;

`;