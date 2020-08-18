import React from 'react';
import { Breadcrumb } from 'react-bootstrap'
import { CategoriesMesh } from './CategoriesMesh'
import { PromotionCarousel } from './PromotionCarousel'

export const Home = (props) => {

  return (
    <div>
      <PromotionCarousel />
      <PathIndicator />
      <CategoriesMesh />
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

