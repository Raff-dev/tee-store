import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { Text, PageSection, PageTitle, Button } from '../../utilities/ThemeComponents'

import { ApiContext } from '../../../contexts/ApiContext';
import { theme } from '../../../contexts/ThemeContext';

export const ImagePreview = ({ product, variant }) => {
    const api = useContext(ApiContext);
    const [imageIndex, setImageIndex] = useState(0);

    return (
        <section>
            <PageTitle>
                {product.name}
            </PageTitle>
            <ImagesContainer className="d-flex ">
                <div className="d-flex flex-column">
                    {variant.images.map((image, index) =>
                        <MiniatureImages
                            key={index}
                            src={api.baseUrl + image.image}
                            onClick={() => setImageIndex(index)}
                            selected={imageIndex == index}
                        />
                    )}
                </div>
                <div>
                    <CurrentImage src={api.baseUrl + variant.images[imageIndex].image} />
                </div>
            </ImagesContainer>
        </section>
    );
}


const CurrentImage = styled.img`
    object-fit:contain;
    overflow:hidden;
    max-width:100%;
    height:auto;
`;

const MiniatureImages = styled.img`
    height:60px;
    border-radius:5px;
    border:1px solid;
    border-color: ${props => (props.selected ? theme.borderSecondary : theme.borderPrimary)} ;
    margin:10px;

    &:hover{
        cursor: pointer;
        border-color: ${theme.borderSecondary} ;

    }

`;
const ImagesContainer = styled.div`
`;
