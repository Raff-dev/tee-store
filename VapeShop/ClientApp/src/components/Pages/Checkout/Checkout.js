import React, { useContext, useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Breadcrumbs, Typography } from '@material-ui/core';

import { CheckoutForm } from './CheckoutForm'
import { CheckoutSummary } from './CheckoutSummary'

const Checkout = () => {
    return (
        <Grid fluid className="p-0 mx-4">
            <Col md={12} lg={6} >
                <Row className="ml-2">
                    <Breadcrumbs>
                        <Link to='/Cart'>Cart</Link>
                        <Typography >Shipping</Typography>
                    </Breadcrumbs>
                </Row>
                <Row className="ml-2">
                    <CheckoutForm />
                </Row>
            </Col>
            <Col md={12} lg={6} style={{ "background-color": "#0001", "height": "1000px" }}>
                <CheckoutSummary />
            </Col>
        </Grid>
    );
}

export default Checkout;


