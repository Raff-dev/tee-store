import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'
import './NavMenu.scss'

const NavMenu = () => {

    return (
        <Navbar >
            <Navbar.Brand>
                <Nav.Link as={Link} to={'/'}>Logo</Nav.Link>
            </Navbar.Brand>

            <Navbar.Brand>
                VapeShop
            </Navbar.Brand>

            <Nav.Item>
                <Nav.Link as={Link} to="/cart" >
                    <Glyphicon glyph='shopping-cart' /> Cart
                </Nav.Link>
            </Nav.Item>
        </Navbar>
    );
}

export default NavMenu;