import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

export const CategoryCard = ({ item, index }) => {
  return (
    <LinkContainer to={`Category/${item.name}`}>
      <article className="categorie mesh-item">
        <p>{item.name}</p>
      </article>
    </LinkContainer>
  );
}