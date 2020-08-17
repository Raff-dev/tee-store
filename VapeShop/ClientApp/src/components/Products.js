import React, { Component, useState } from 'react';
import { Resource } from './utilities/Resource'

export const Products = (props) => {

  const render = data => {
    return (
      <div>
        {data.loading && <p>Loading...</p>}
        {!data.loading &&
          <section className="products mesh">
            {
              [...Array(10).keys()].map(i => {
                return data.payload.map((item, index) => {
                  return <ProductCard item={item} index={index} />
                })

              })}
          </section>
        }
      </div>
    );
  }

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
    <Resource
      path='/api/products'
      render={render}
    />
  );
}