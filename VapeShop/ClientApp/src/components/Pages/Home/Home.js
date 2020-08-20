import React from 'react';
import { Breadcrumb } from 'react-bootstrap'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import { CategoriesMesh } from './CategoriesMesh'
import { PromotionCarousel } from './PromotionCarousel'

export const Home = (props) => {

  return (
    <div>
      <PromotionCarousel />
      <PathIndicator />
      <CategoriesMesh />
      <Fab color="secondary" variant="extended">
        <NavigationIcon />
      </Fab>
    </div>
  );
}


const PathIndicator = (props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item
        href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
     </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
}

