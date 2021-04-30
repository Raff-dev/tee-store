import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import { CartContext } from "../../contexts/CartContext";
import { theme } from "../../contexts/ThemeContext";

const NavMenu = () => {
    const cart = useContext(CartContext);
    const logoUrl = "images/logo.png";

    return (
        <MyNav fluid fixed="top">
            <Brand>
                <Nav.Link as={Link} to={"/"}>
                    <Logo src={logoUrl} />
                </Nav.Link>
            </Brand>

            <Nav.Item>
                <NavLink as={Link} to="/Cart">
                    <Badge badgeContent={cart.items.length} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </NavLink>
            </Nav.Item>
        </MyNav>
    );
};

const Logo = styled.img``;

const MyNav = styled(Navbar)`
    position: sticky;
    margin: 0;
    padding: 6px 30%;
    justify-content: space-between;
    display: flex;
    box-shadow: 0 0 4px rgb(0 0 0 / 5%);
    border-bottom: 1px solid ${theme.borderPrimary};
    background-color: ${theme.bgSecondary};
    background-image: none;
`;

const Brand = styled(Navbar.Brand)`
    img {
        height: 50px;
        width: auto;
    }
    padding: 0;

    position: relative;
`;

const NavLink = styled(Nav.Link)`
    color: ${theme.textInfo};
    padding: 0 !important;
`;

export default NavMenu;
