import React, { useContext, useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Breadcrumbs, Typography } from '@material-ui/core';

import { Text, PageSection, PageTitle, ListEntry, Button } from '../../utilities/ThemeComponents'

import { CheckoutForm } from './CheckoutForm'
import { CheckoutSummary } from './CheckoutSummary'

const Checkout = () => {
    return (
        <Grid fluid className="p-0 mx-4">
            <Col md={12} lg={6} className="px-4" >
                <Row className="ml-4">
                    <PageTitle>Checkout</PageTitle>
                    <ListEntry>
                        <Breadcrumbs>
                            <Link to='/Cart'>Cart</Link>
                            <Typography >Shipping</Typography>
                        </Breadcrumbs>
                    </ListEntry>
                </Row>
                <Row className="ml-4 pt-3">
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


