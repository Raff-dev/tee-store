import React from 'react';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

export const ProductCard = ({ item, index }) => {
  return (
    <LinkContainer to={`/Product/${item.id}`}>
      <Card>
        <Card.Img variant="top" src={item.mediaFilesSources[0]} />
        <Card.Body>
          <Card.Title>
            <b>{item.name}</b>
            <b>{item.id}</b>
          </Card.Title>
          <Card.Text>
            <p>{item.brand}</p>
            <p>{item.price}</p>
            <p>{item.type}</p>
          </Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

