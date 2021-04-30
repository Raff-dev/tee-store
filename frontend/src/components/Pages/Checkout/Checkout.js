import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@material-ui/core";

import { CartContext } from "../../../contexts/CartContext";
import { ApiContext } from "../../../contexts/ApiContext";

import {
    PageTitle,
    ListEntry,
    PageSection,
} from "../../utilities/ThemeComponents";

import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { CartEmpty } from "../Cart/EmptyCart";
import { Resource } from "../../utilities/Resource";

const Checkout = () => {
    const api = useContext(ApiContext);
    const cart = useContext(CartContext);

    return (
        <PageSection>
            <Resource path={api.cartProducts} data={{ ids: cart.ids }}>
                {({ payload, loading }) => {
                    if (!loading && payload.length === 0) {
                        return <CartEmpty />;
                    }
                    return (
                        <Container fluid className="p-0 mx-md-4 d-lg-flex">
                            <Col md={12} lg={6} className="px-4">
                                <Row className="ml-md-4">
                                    <PageTitle>Checkout</PageTitle>
                                    <ListEntry>
                                        <Breadcrumbs>
                                            <Link to="/Cart">Cart</Link>
                                            <Typography>Shipping</Typography>
                                        </Breadcrumbs>
                                    </ListEntry>
                                </Row>
                                <Row className="ml-md-4 pt-3">
                                    <CheckoutForm />
                                </Row>
                            </Col>
                            <Col md={12} lg={6}>
                                <CheckoutSummary
                                    cartProducts={payload}
                                    loading={loading}
                                />
                            </Col>
                        </Container>
                    );
                }}
            </Resource>
        </PageSection>
    );
};

export default Checkout;
