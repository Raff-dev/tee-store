import React from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { SocialIcon } from 'react-social-icons';

import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';
import { ImagePreview } from './ImagePreview';
import { ProductMenu } from './ProductMenu';
import styled from 'styled-components';

const ProductDetail = ({ match }) => {
    const { productId, variantId } = match.params;
    const apiUrl = 'http://127.0.0.1:8000';

    console.log('here');
    return (
        <Grid className="mt-4">
            <Resource path={apiUrl + '/api/Products/' + productId}>
                {({ payload, loading }) => {
                    let variant = loading || payload.variants.find(variant => variant.id == variantId);
                    console.log(payload)
                    return (
                        <Loadable loading={loading}>
                            <Container>
                                <Row >
                                    <Col lg={8} md={12} className="d-flex justify-content-center">
                                        <ImagePreview variant={variant} />
                                    </Col>
                                    <Col lg={4} md={12}>
                                        <ProductMenu product={payload} />
                                    </Col>
                                </Row >
                                <SocialIcons >
                                    <SocialIcon url="http://facebook.com/" />
                                    <SocialIcon url="http://twitter.com/" />
                                    <SocialIcon url="https://mail.google.com/" />
                                </SocialIcons>
                            </Container>
                        </Loadable>
                    );
                }}
            </Resource>
        </Grid>
    );
}

const SocialIcons = styled(Row)`
    display:flex;
    justify-content:center;

    a{
       margin:10px; 
    }
`;


export default ProductDetail;