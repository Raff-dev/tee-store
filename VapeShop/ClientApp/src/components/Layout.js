import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';

const Layout = (props) => {
  return (
    <Grid fluid>
      <Row>
        <Col sm={3}>
          <NavMenu />
        </Col>
        <Col sm={9}>
          {props.children}
        </Col>
      </Row>
    </Grid>
  );
}

export default Layout;