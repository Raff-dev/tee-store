import React, { useState } from 'react';
import styled from 'styled-components';

export const ImagePreview = ({ variant }) => {
    const apiUrl = 'http://127.0.0.1:8000';
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <ImagesContainer>
            {variant.images.map((image, index) =>
                <MiniatureImage
                    key={index}
                    src={apiUrl + image.image}
                    onClick={() => setImageIndex(index)}
                />
            )}
            <CurrentImage src={apiUrl + variant.images[imageIndex].image} />
        </ImagesContainer>
    );
}

const CurrentImage = styled.img`

`;
const MiniatureImage = styled.img`
    height:60px;
    border-radius:5px;
    border:1px solid rgba(100, 100, 100, 0.5);

    &:hover{
        border-color: rgba(100, 100, 100, 0.2);
        cursor: pointer;
    }

`;
const ImagesContainer = styled.div`
`;
