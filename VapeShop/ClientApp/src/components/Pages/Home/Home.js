import React from 'react';

import { CategoryCard } from './CategoryCard'
import { PromotionCarousel } from './PromotionCarousel'
import { ItemMesh } from '../../utilities/ItemMesh'

const Home = (props) => {

  return (
    <div>
      <PromotionCarousel />
      <ItemMesh path='/api/Categories' ItemCard={CategoryCard} />
    </div>
  );
}

export default Home;
