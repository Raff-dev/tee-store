import React from 'react';
import { ProductCard } from './ProductCard'
import { Resource } from '../../../utilities/Resource';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { SideBar } from './SideBar';
import { Loadable } from '../../../utilities/Loadable';

export const Category = ({ category, payload, loading, refresh }) => {
    return (
        <Container>
            <Row>
                <Col sm={3}><SideBar /></Col>
                <Col>
                    <Card fluid>{category}</Card>
                    <br />
                    <Card>
                        <Row>
                            <Col className="bg-red ">
                                <span className="align-middle text-muted mh-2">There are {payload.length} products</span>
                            </Col>

                            <Col className="d-flex align-middle">

                                <span className="align-middle text-center text-muted pr-2">Sort by - </span>
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Control as="select" size="sm" custom>
                                            <option>Featured</option>
                                            <option>Price - Ascending</option>
                                            <option>Price - Descending</option>
                                            <option>Popularity - Ascending</option>
                                            <option>Popularity - Descending</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                    <br />
                    <Card className="category-mesh">
                        <Loadable loading={loading}>
                            {payload.map((item, index) => <ProductCard item={item} index={index} />)}
                        </Loadable>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
