import React, { useState } from 'react';
import styled from 'styled-components';

export const ImagePreview = ({ product, variant }) => {
    const apiUrl = 'http://127.0.0.1:8000';
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <section>
            <Name>
                {product.name}
            </Name>
            <ImagesContainer>
                {variant.images.map((image, index) =>
                    <MiniatureImage
                        key={index}
                        src={apiUrl + image.image}
                        onClick={() => setImageIndex(index)}
                        selected={imageIndex == index}
                    />
                )}
                <CurrentImage src={apiUrl + variant.images[imageIndex].image} />
            </ImagesContainer>
        </section>
    );
}

const Name = styled.div`
    font-size:1.5rem;
    font-weight:600;
    color:rgba(0,0,0,0.7);
    padding-bottom:20px;
`;
const CurrentImage = styled.img`

`;
const MiniatureImage = styled.img`
    height:60px;
    border-radius:5px;
    border:1px solid;
    border-color: ${props => (props.selected ? "#0008" : "#0002")} ;

    &:hover{
        cursor: pointer;
    }

`;
const ImagesContainer = styled.div`
`;
