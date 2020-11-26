import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.scss'

export const NavMenu = (props) => {

    return (
        <Navbar inverse fixedTop fluid collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to={'/'}>VapeShop</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <LinkContainer to={'/'} exact>
                <NavItem>
                    <Glyphicon glyph='home' /> Home
                    </NavItem>
            </LinkContainer>

            <LinkContainer to={'/Admin'} exact>
                <NavItem>
                    <Glyphicon glyph='home' /> Admin
                    </NavItem>
            </LinkContainer>

            <LinkContainer to={'/Cart'} exact>
                <NavItem>
                    <Glyphicon glyph='shopping-cart' /> Cart
                    </NavItem>
            </LinkContainer>
        </Navbar>
    );
}