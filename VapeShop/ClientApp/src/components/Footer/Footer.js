import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <StyledFooter>
            <Contact>
                <a href="tel:+48420420420">
                    420420420
                </a>
                <a href="mailto:contact@teeshop.com">
                    contact@teeshop.com
                </a>
            </Contact>
            <SocialMediaIcons>

            </SocialMediaIcons>
            <Links>
                <a>Home</a>
                <a>Cart</a>
            </Links>
            <Copyright>
                Copyright © 2021, TeeShop.com. All rights reserved.
                <a>Terms & Conditions</a>|
                <a>Privacy Policy</a>|
                <a>DMCA Notice</a>|
            </Copyright>


        </StyledFooter>
    );
}

export default Footer;

const Contact = styled.div`

`;

const Links = styled.div`
`;

const Copyright = styled.div`

`;

const SocialMediaIcons = styled.div`

`;

const StyledFooter = styled.footer`
    height: 300px;
    background-color: #fcfcfc;
    border: 0 solid #e5e7eb;
`;