import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SocialIcon } from 'react-social-icons';

import { PageSection } from '../../utilities/ThemeComponents'

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
        <PageSection className="mt-4">
            <Resource path={api.products + productId}>
                {({ payload, loading }) => {
                    let variant = loading || payload.variants.find(variant =>
                        parseInt(variant.id, 10) === parseInt(variantId, 10));
                    return (
                        <Loadable loading={loading}>
                            <CartModal isOpen={cartModalOpen} closeCartModal={() => setCartModalOpen(false)} />
                            <Row >
                                <Col md={8} sm={12} className="d-flex">
                                    <ImagePreview product={payload} variant={variant} />
                                </Col>
                                <Col md={4} sm={12}>
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