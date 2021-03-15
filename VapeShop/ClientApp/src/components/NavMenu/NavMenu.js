import React, { useContext } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'

import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { CartContext } from '../../contexts/CartContext'
import { theme } from '../../contexts/ThemeContext';

const NavMenu = () => {
    const cart = useContext(CartContext);
    const logoUrl = 'images/logo.png'

    return (
        <MyNav fluid fixed="top">
            <Navbar.Brand>
                <Nav.Link as={Link} to={'/'} style={{ position: "relative" }}>
                    <Logo src={logoUrl} />
                </Nav.Link>
            </Navbar.Brand>


            <Nav.Item>
                <Nav.Link as={Link} style={{ color: theme.textInfo }} to="/Cart" >
                    <Badge badgeContent={cart.items.length} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </Nav.Link>
            </Nav.Item>
        </MyNav>
    );
}

const Logo = styled.img`
    position: absolute;
    height: inherit;
    top:0;
    left:-50%;
`;


const MyNav = styled(Navbar)`
    position:sticky;
    margin:0;
    justify-content:space-between;
    display:flex;
    box-shadow: 0 0 4px rgb(0 0 0 / 5%);
    border-bottom: 1px solid ${theme.borderPrimary};
    background-color:transparent;
    background-image:none;
`;

export default NavMenu;