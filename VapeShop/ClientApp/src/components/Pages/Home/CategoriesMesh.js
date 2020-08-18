import React, { Component, useState } from 'react';
import { ItemMesh } from '../../utilities/ItemMesh'

export const CategoriesMesh = (props) => {

  const CategoryCard = ({ item, index }) => {
    return (
      <article className="categorie mesh-item">
        <p>{item.name}</p>
      </article>
    );
  }

  return (
    <ItemMesh
      path='/api/Categories'
      ItemCard={CategoryCard}
    />
  );
}