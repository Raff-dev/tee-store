import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'react-bootstrap'

export const PromotionCarousel = (props) => {
    return (
        <StyledCarousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    alt="First slide"
                    src="images/img1.jpg"
                />
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    alt="Second slide"
                    src="images/img2.jpg"
                />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="images/img3.jpg"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </StyledCarousel>
    );
}

const StyledCarousel = styled(Carousel)`
    overflow: hidden;
    height:400px;
    .item{
        overflow: hidden;
        justify-content: center;
        align-items: center;
        height: 300px;
    }

    img{
        object-fit: contain;
    }
`;
