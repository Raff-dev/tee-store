import React from 'react';
import styled from 'styled-components'

export const CategoryButtonGroup = ({ setCategory, categories }) => {
    return (
        <Container>
            <p>Filter by product</p>
            {categories.map((category, index) =>
                <Category key={index} onClick={() => setCategory(category)}>
                    {category}
                </Category>
            )}
        </Container>
    );
}

const Category = styled.span`
    font-size: 1.1rem;
    font-weight:600;
    padding-left:10px;
    &:hover {
        opacity:0.7;
        cursor:pointer;
        color: #c483e9;

    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width:auto;
    padding:20px;
`;