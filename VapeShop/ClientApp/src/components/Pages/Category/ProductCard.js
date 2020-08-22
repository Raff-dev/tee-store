import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

export const ProductCard = ({ category, item, index, ...props }) => {
  return (
    <LinkContainer to={`/Product/${item.name}`}>
      <article className="product mesh-item">
        <p>{index}</p>
        <p>{item.name}</p>
        <p>{item.brand}</p>
        <p>{item.price}</p>
        <p>{item.type}</p>
      </article>
    </LinkContainer>
  );
}

