import React, { useContext } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Navbar, Glyphicon } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav'

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import { CartContext } from '../../contexts/CartContext'
import { theme } from '../../contexts/ThemeContext';

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
                <Nav.Link as={Link} style={{ color: theme.textInfo }} to="/Cart" >
                    <StyledBadge badgeContent={cart.items.length} color="secondary">
                        <ShoppingCartIcon />
                    </StyledBadge>
                </Nav.Link>
            </Nav.Item>
        </MyNav>
    );
}
const StyledBadge = styled(Badge)`
    border: 5px solid;
    border-color: ${props => theme.bgPrimary};
    padding: 0 4px;
`;

const Counter = styled.span`
    transform: translate(10px, 10px);
    position: absolute;
    background: ${props => theme.btnPrimary};
    border-radius: 100%;
    width: 20px;
    height: 20px;
    text-align: center;
    color: white;
    font-weight:600;
`;


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