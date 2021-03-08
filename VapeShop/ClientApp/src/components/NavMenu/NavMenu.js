import React, { useContext } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'

import { CartContext } from '../../contexts/CartContext'

const NavMenu = () => {
    const cart = useContext(CartContext);

    return (
        <MyNav fixed="top">
            <Navbar.Brand>
                <Nav.Link as={Link} to={'/'}>Logo</Nav.Link>
            </Navbar.Brand>

            <Brand>
                VapeShop
            </Brand>

            <Nav.Item>
                <Nav.Link as={Link} to="/Cart" >
                    <Glyphicon glyph='shopping-cart' /> Cart {cart.items.length}
                </Nav.Link>
            </Nav.Item>
        </MyNav>
    );
}

const Brand = styled(Navbar.Brand)`
    user-select:none;
`;
const MyNav = styled(Navbar)`
    position:sticky;
    margin:0;

    border: 0 solid #e5e7eb;
    background-color:transparent;
    background-image:none;

`;

export default NavMenu;