import React, { Component, useState } from 'react';
import { Resource } from './utilities/Resource'

export const Items = (props) => {

  const content = data => {
    return (
      <div>
        <h1>Items</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {data.loading && <p>Loading...</p>}
        {!data.loading &&
          <section className="items">
            {data.payload.map((item, index) => {
              return <ItemCard item={item} index={index} />
            })}
          </section>
        }
      </div>
    );
  }

  const ItemCard = ({ item, index }) => {
    return (
      <article className="item">
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
      path='/api/items'
      render={content}
    />
  );
}