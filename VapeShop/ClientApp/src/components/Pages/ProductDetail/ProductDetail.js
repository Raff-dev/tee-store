import React, { useContext, useState } from 'react';
import { Grid, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { SocialIcon } from 'react-social-icons';

import { Text, PageSection, PageTitle, Button } from '../../utilities/ThemeComponents'

import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';
import { ImagePreview } from './ImagePreview';
import { ProductMenu } from './ProductMenu';
import styled from 'styled-components';
import { ApiContext } from '../../../contexts/ApiContext'
import { CartModal } from './CartModal';
const ProductDetail = ({ match }) => {
    const { productId, variantId } = match.params;
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const api = useContext(ApiContext);

    return (
        <PageSection fluid className="mt-4">
            <Resource path={api.products + productId}>
                {({ payload, loading }) => {
                    let variant = loading || payload.variants.find(variant => variant.id == variantId);
                    return (
                        <Loadable loading={loading}>
                            <CartModal isOpen={cartModalOpen} closeCartModal={() => setCartModalOpen(false)} />
                            <Row >
                                <Col lg={8} md={12} className="d-flex justify-content-center">
                                    <ImagePreview product={payload} variant={variant} />
                                </Col>
                                <Col lg={4} md={12}>
                                    <ProductMenu product={payload} variant={variant} openCartModal={() => setCartModalOpen(true)} />
                                </Col>
                            </Row >
                            <SocialIcons >
                                <SocialIcon url="http://facebook.com/" />
                                <SocialIcon url="http://twitter.com/" />
                                <SocialIcon url="https://mail.google.com/" />
                            </SocialIcons>
                        </Loadable>
                    );
                }}
            </Resource>
        </PageSection>
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