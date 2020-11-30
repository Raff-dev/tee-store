import React, { useState, useEffect } from 'react';
import { Button, setRef } from '@material-ui/core';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { SideBar } from './SideBar';
import { Loadable } from '../../../utilities/Loadable';
import { ProductCard } from './ProductCard'
import { Resource } from '../../../utilities/Resource';

export const Category = ({ category, payload, loading }) => {
    const [filters, setFilters] = useState({});
    const [sorting, setSorting] = useState(undefined);
    const [products, setProducts] = useState(payload);
    const [refreshVar, setRefreshVar] = useState(false);

    const refresh = () => setRefreshVar(v => !v);

    const brands = payload.map(product => product.brand)
        .filter((value, index, self) => self.indexOf(value) === index)

    useEffect(() => {
        let filteredProducts = [...payload];

        for (let [name, filter] of Object.entries(filters)) {
            filteredProducts = filteredProducts.filter(filter);
        }

        filteredProducts = filteredProducts.sort(sorting)

        setProducts(filteredProducts);
    }, [payload, sorting, filters, refreshVar]);

    const onSortingChange = (event) => {
        let sortingName = event.target.value;
        console.log(sortingName)
        if (sortingName === 'featured')
            setSorting(() => (first, second) => 0);

        else if (sortingName === 'pricecasc')
            setSorting(() => (first, second) => first.price - second.price);

        else if (sortingName === 'pricedesc')
            setSorting(() => (first, second) => -first.price + second.price);

        else if (sortingName === 'popularityasc') setSorting(undefined);

        else if (sortingName === 'popularitydesc') setSorting(undefined);
    }

    return (
        <Container>
            <Row>
                <Col sm={3}>
                    <SideBar brands={brands} refresh={refresh} loading={loading} setFilters={setFilters} />
                </Col>
                <Col>
                    <Card >{category}</Card>
                    <br />
                    <Card>
                        <Row>
                            <Col className="bg-red ">
                                <span className="align-middle text-muted mh-2">There are {products.length} products</span>
                            </Col>
                            <Col className="d-flex align-middle">
                                <span className="align-middle text-center text-muted pr-2">Sort by - </span>
                                <Form>
                                    <Form.Group controlId="exampleForm.SelectCustom">
                                        <Form.Control as="select" size="sm" custom onChange={onSortingChange}>
                                            <option value="featured">Featured</option>
                                            <option value="pricecasc">Price - Ascending</option>
                                            <option value="pricedesc">Price - Descending</option>
                                            <option value="popularityasc">Popularity - Ascending</option>
                                            <option value="popularitydesc">Popularity - Descending</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Card>
                    <br />
                    <Card className="category-mesh">
                        <Loadable loading={loading}>
                            {products.map((item, index) => <ProductCard item={item} index={index} />)}
                        </Loadable>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};