import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { Button, Text } from '../../utilities/ThemeComponents';

export const CartEmpty = withRouter(({ history }) => {
    return (
        <Row className="justify-content-center">
            <Col sm={12} md={4} lg={3} className="py-3 text-center">
                <Text info className="font-weight-bold py-3">
                    <h4>Your cart is empty</h4>
                </Text>
                <Button primary onClick={() => history.push('/')}>Go Shopping</Button>
            </Col>
        </Row>
    );
});

