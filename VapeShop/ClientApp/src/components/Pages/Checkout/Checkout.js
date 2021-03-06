import React, { useContext, useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Breadcrumbs, Typography } from '@material-ui/core';
import { ApiContext } from '../../../contexts/ApiContext';
import { CartContext } from '../../../contexts/CartContext';
import { Shipping } from './Shipping'
import { CheckoutSummary } from './CheckoutSummary'

const Checkout = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)
    }

    return (
        <Grid>
            <Col md={12} lg={6}>
                <Row>
                    <Breadcrumbs>
                        <Link to='/Cart'>Cart</Link>
                        <Typography >Shipping</Typography>
                    </Breadcrumbs>
                </Row>
                <Row>
                    <Shipping onSubmit={onSubmit} />
                </Row>
            </Col>
            <Col md={12} lg={6} style={{ "background-color": "#0001", "height": "800px" }}>
                <CheckoutSummary />
            </Col>
        </Grid>
    );
}

export default Checkout;


