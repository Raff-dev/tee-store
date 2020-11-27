import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const ProductCard = ({ item }) => {
  const addToCart = () => {

  }

  return (
    <Card>
      <Card.Img variant="top" src={item.mediaFilesSources[0]} />
      <LinkContainer to={`/Product/${item.id}`}>
        <Card.Body>
          <Card.Title>
            <span className="text-muted">{item.name}</span>
          </Card.Title>
          <Card.Text>
            <span className="">${item.price}</span>
          </Card.Text>
        </Card.Body>
      </LinkContainer>
      <Button onClick={addToCart}>Add to Cart</Button>
    </Card>
  );
}