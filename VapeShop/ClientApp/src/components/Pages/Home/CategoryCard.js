import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Card from 'react-bootstrap/Card';

export const CategoryCard = ({ item, index }) => {
  return (
    <LinkContainer to={`Category/${item.name}`}>
      <Card>
        <Card.Img variant="top" src={item.mediaFileSource} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}