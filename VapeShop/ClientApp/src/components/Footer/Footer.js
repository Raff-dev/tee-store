import React from 'react';
import styled from 'styled-components';
import { SocialIcon } from 'react-social-icons';
import { Row } from 'react-bootstrap';
import { theme } from '../../contexts/ThemeContext';

const Footer = () => {
    return (
        <StyledFooter>
            <Info>
                <Logo className="d-none d-sm-block">
                    <img src="images/logo.png" />
                </Logo>
                <SocialIcons className="p-2">
                    <SocialIcon bgColor={theme.btnPrimary} fgColor={theme.bgSecondary} url="http://facebook.com/" />
                    <SocialIcon bgColor={theme.btnPrimary} fgColor={theme.bgSecondary} url="http://twitter.com/" />
                    <SocialIcon bgColor={theme.btnPrimary} fgColor={theme.bgSecondary} url="https://instagram.com/" />
                    <SocialIcon bgColor={theme.btnPrimary} fgColor={theme.bgSecondary} url="https://youtube.com/" />
                </SocialIcons>
                <Links className="p-2">
                    <a href="/">Home</a>
                    <a href="/Cart">Cart</a>
                    <a href="/About">About</a>
                </Links>
            </Info>
            <Copyright>
                <p>
                    Copyright © 2021, TeeShop.com. All rights reserved.
                </p>
                <p>
                    <a href="/"> Terms & Conditions</a> |
                    <a href="/"> Privacy Policy</a> |
                    <a href="/"> DMCA Notice</a>
                </p>
            </Copyright>
        </StyledFooter>
    );
}

export default Footer;
const Logo = styled.div`
    position:absolute;
    left:0;
    top:0;
    padding:20px;
    img{
        width:150px;
        height:auto;
    }
`;

const Contact = styled.div`

`;

const Links = styled.div`
    display:flex;
    justify-content:center;


    a{
        margin-left:30px;
        margin-right:30px;
    }
`;

const Copyright = styled.div`
    background-color: ${theme.bgTrietary};
    display:flex;
    justify-content:center;
    padding:20px;
    width:100%;
    flex-direction:column;
`;

const SocialIcons = styled(Row)`
    display:flex;
    justify-content:center;

    a{
       margin:10px; 
       height:30px !important;
       width:30px !important;
    }
`;


const Info = styled.div`
    background-color:${theme.bgSecondary};
    height:auto;
    border-top: 1px solid ${theme.borderPrimary};
    padding:10px;
`;

const StyledFooter = styled.footer`
    height:auto;
    position:relative;
    background-color:${theme.bgSecondary};
    border: 0 solid #e5e7eb;
    text-align:center;
    a{
        color: ${theme.textDefault};
        text-decoration:none;
    }
`;