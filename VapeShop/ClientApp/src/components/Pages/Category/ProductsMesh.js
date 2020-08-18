import React, { Component, useState } from 'react';
import { ItemMesh } from '../../utilities/ItemMesh'

export const ProductsMesh = (props) => {

  const ProductCard = ({ item, index }) => {
    return (
      <article className="product mesh-item">
        <p>{index}</p>
        <p>{item.name}</p>
        <p>{item.brand}</p>
        <p>{item.price}</p>
        <p>{item.type}</p>
      </article>
    );
  }

  return (
    <ItemMesh
      path='/api/products'
      ItemCard={ProductCard}
    />
  );
}