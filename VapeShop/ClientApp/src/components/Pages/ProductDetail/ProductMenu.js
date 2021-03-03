import React, { useRef, useContext } from 'react';
import { Col, Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components';
import { CartContext } from '../../../contexts/CartContext'

export const ProductMenu = ({ product, variant, openSizeModal }) => {
    const cart = useContext(CartContext);
    const sizeRef = useRef();

    const addToCart = () => {
        let id = sizeRef.current.value;
        cart.addItem(id);
    }

    return (
        <section>
            <p>PRICE</p>
            <p>${product.price}</p>
            <p>{product.title}</p>
            <p>{product.description}</p>
            <ProductOption>
                <div>
                    <div>
                        COLOR
                    </div>
                    <div>
                        {variant.name}
                    </div>
                </div>
                <div>
                    {product.variants.map((variant, index) =>
                        <div key={index}>
                            <span>{variant.name}</span>
                        </div>
                    )}
                </div>
            </ProductOption>
            <Form>
                <Form.Row >
                    <ProductOption>
                        <div >
                            <div>
                                SIZE
                            </div>
                            <SizeModalButton>
                                Sizing and fabric
                            </SizeModalButton>
                        </div>
                        <div>
                            <Form.Control
                                ref={sizeRef}
                                as="select"
                                id="inlineFormCustomSelect"
                                custom
                            >
                                {variant.sizes.map((size, index) =>
                                    <option value={size.id} >{size.size}</option>
                                )}
                            </Form.Control>
                        </div>
                    </ProductOption>
                </Form.Row>
                <Form.Row className="justify-content-center">
                    <SubmitButton onClick={addToCart}>ADD TO CART</SubmitButton>
                </Form.Row>
            </Form>
        </section >
    );
}
const ColorIcon = styled.div`

`;
const SizeModalButton = styled.div`
    color : rgba(50,50,255,0.8);

    :hover{
        cursor: pointer;
        opacity:0.8;
    }
`;

const ProductOption = styled.div`
    border: 1 solid grey;
    display:flex;
    justify-content:space-between;
    padding-top:20px;
    width:100%;
`;

const SubmitButton = styled.div`
    color: white;
    background-color: rgb(196, 131, 233);
    border: 1 solid rgba(196, 131, 233,0.6);
    border-radius:5px;
    text-align:center;
    padding: 12px;
    margin-top:30px;
    width:100%;
    font-size:1.2rem;
    font-weight: 300;
    font-family: system-ui;

    :hover{
        opacity:0.8;
        cursor:pointer;
    }
`;