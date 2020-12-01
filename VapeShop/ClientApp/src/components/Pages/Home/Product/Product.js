import React from 'react';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { LinkContainer } from 'react-router-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Loadable } from '../../../utilities/Loadable';
import { SocialIcon } from 'react-social-icons';
import { Divider } from '@material-ui/core';

import './Product.scss'

export const Product = ({ id, payload, loading }) => {
    const { categoryName, name, price, brand, mediaFilesSources } = payload;

    return (
        <section className="product">
            <BreadCrumbs id={id} loading={loading}  {...payload} />
            <br />
            <ProductDetail id={id} loading={loading} {...payload} />
            <br />
            <RecommendedProducts />
        </section>
    );
};

const BreadCrumbs = ({ name, id, categoryName, loading }) => {
    return (
        <Card>
            <div className="py-1 mx-2 d-flex">
                <LinkContainer to="/">
                    <span className="mx-2">Home</span>
                </LinkContainer>/
                <Loadable loading={loading}>
                    <LinkContainer to={`/Category/${categoryName}`}>
                        <span className="mx-2">{categoryName}</span>
                    </LinkContainer>/
                    <LinkContainer to={`/Product/${id}`}>
                        <span className="mx-2">{name}</span>
                    </LinkContainer>
                </Loadable>
            </div>
        </Card>
    );

}

const ProductCarousel = ({ sources }) => {
    return (
        <Card >
            <Carousel>
                {sources.map(source =>
                    <Carousel.Item>
                        <img className="d-block w-100" src={source} alt="Product image" />
                    </Carousel.Item>)}
            </Carousel>
        </Card>
    );
}

const ProductDetail = ({ id, categoryName, name, price, brand, mediaFilesSources, loading }) => {
    return (
        <Card className="px-2 py-4">
            <Loadable loading={loading}>
                <Row xs={1} md={2}>
                    <Col classname="product-carousel" >
                        <ProductCarousel sources={mediaFilesSources} />
                    </Col>
                    <Col>
                        <Row><h4 className="font-weight-bold">{name}</h4></Row>
                        <Row><h4 className="text-muted font-weight-bold">${price}</h4></Row>
                        <Row><span className="text-muted">Owijki na nadgarstki SMPOWER zostały wykonane z najwyższej jakości materiałów. Odpowiednia sztywność, a jednocześnie odpowiednia elastyczność zapewniają komfort użytkowania oraz bezpieczeństwo nawet podczas ciężkich treningów siłowych.</span></Row>
                        <br />
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="fromVariant">
                                    <Form.Label>Variant</Form.Label>
                                    <Form.Control as="select" size="sm" custom readOnly>
                                        <option value="default">Default</option>

                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md={2}>                                <span>Quantity</span>                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Form.Group controlId="fromQuantity" classname="d-flex">
                                    <Form.Control type="text" defaultValue={1} />
                                </Form.Group>
                            </Col>
                            <Col >
                                <Button >Add To Cart</Button>
                            </Col>
                        </Row>
                        <Row className="d-flex">
                            <div className="d-flex align-middle">
                                <span className="d-grid align-middle">Share</span>
                            </div>
                            <div className="social-icons">
                                <SocialIcon url="https://www.facebook.com/" bgColor="rgb(0, 127, 177)" />
                                <SocialIcon url="https://twitter.com/home/" bgColor="rgb(0, 127, 177)" />
                                <SocialIcon url="https://www.pinterest.com/" bgColor="rgb(0, 127, 177)" />
                                <SocialIcon url="https://plus.google.com//" bgColor="rgb(0, 127, 177)" />
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Loadable>
        </Card >
    );
}

const RecommendedProducts = () => {
    return (
        <Card>
            <h3>Recommended Products</h3>
            <section>prod1,prod2</section>
        </Card>
    );
}