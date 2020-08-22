import React from 'react';
import { Breadcrumb } from 'react-bootstrap'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import { CategoryCard } from './CategoryCard'
import { PromotionCarousel } from './PromotionCarousel'
import { ItemMesh } from '../../utilities/ItemMesh'

const Home = (props) => {

  return (
    <div>
      <PromotionCarousel />
      <ItemMesh path='/api/Categories' ItemCard={CategoryCard} />
      <Fab color="secondary" variant="extended">
        <NavigationIcon />
      </Fab>
    </div>
  );
}

export default Home;
