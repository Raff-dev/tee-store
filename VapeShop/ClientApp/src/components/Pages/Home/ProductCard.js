import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export const ProductCard = ({ product, variant }) => {
    const apiUrl = 'http://127.0.0.1:8000'

    let image = variant.images[0].image;
    return (
        <Card to={`/Product/${product.id}/${variant.id}`}>
            <Image src={apiUrl + image} alt="variant image" />
            <Name>{product.name}</Name>
            <Price>${product.price}</Price>
        </Card>
    );
}

const Price = styled.span`
    color:rgb(196, 131, 233);
    font-size:1.1rem;

`;

const Name = styled.span`
    color: rgb(135, 149, 161);
`;

const Image = styled.img`
    object-fit:contain;
`;

const Card = styled(Link)`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom:5vh;

    animation: fadeIn 0.4s forwards;

    @-webkit-keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
         
    @keyframes fadeIn {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }

    &:hover {
        cursor: pointer;
        text-decoration:none;
    }
`;

