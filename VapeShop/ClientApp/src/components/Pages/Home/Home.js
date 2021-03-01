import React from 'react';
import { useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import { PromotionCarousel } from './PromotionCarousel'
import { CollectionButtonGroup } from './CollectionButtonGroup'
import { CategoryButtonGroup } from './CategoryButtonGroup'
import { ProductsMesh } from './ProductsMesh'
import './Home.scss';

const Home = (props) => {
  const [category, setCategory] = useState(null);
  const [collection, setCollection] = useState(null);

  return (
    <div>
      <PromotionCarousel />
      <br />
      <CollectionButtonGroup setCollection={setCollection} />
      <Grid>
        <Row>
          <Col>
            <CategoryButtonGroup setCategory={setCategory} />
          </Col>
          <Col>
            <ProductsMesh category={category} collection={collection} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Home;
