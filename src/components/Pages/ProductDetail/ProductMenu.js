import React, { useRef, useContext } from 'react';
import Form from 'react-bootstrap/Form'
import styled from 'styled-components';

import { Button, Text } from '../../utilities/ThemeComponents'

import { CartContext } from '../../../contexts/CartContext'

export const ProductMenu = ({ product, variant, openCartModal }) => {
    const cart = useContext(CartContext);
    const sizeRef = useRef();

    const addToCart = (event) => {
        event.preventDefault();
        openCartModal();
        let id = sizeRef.current.value;
        cart.addItem(id);
    }

    return (
        <section>
            <h3><Text className="font-weight-bold">{cart.currency}{product.price}</Text></h3>
            <p><Text muted>{product.title}</Text></p>
            <p>{product.description}</p>
            <ProductOption>
                <div>
                    <Text info>
                        COLOR
                    </Text >
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
                            <Text info>
                                SIZE
                            </Text>
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
                                {variant.instances.map((instance, index) =>
                                    <option value={instance.id} key={index}>{instance.size_label}</option>
                                )}
                            </Form.Control>
                        </div>
                    </ProductOption>
                </Form.Row>
                <Form.Row className="justify-content-center pt-3">
                    <Button type="button" primary onClick={addToCart}>ADD TO CART</Button>
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

