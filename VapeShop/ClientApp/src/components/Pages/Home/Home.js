import React, { useContext } from 'react';
import { useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'

import { PromotionCarousel } from './PromotionCarousel'
import { CollectionButtonGroup } from './CollectionButtonGroup'
import { CategoryButtonGroup } from './CategoryButtonGroup'
import { ProductsMesh } from './ProductsMesh'
import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';

import { ApiContext } from '../../../contexts/ApiContext'

const Home = (props) => {
  const allCategory = 'All products';
  const api = useContext(ApiContext);

  const [category, setCategory] = useState(allCategory);
  const [collection, setCollection] = useState(null);

  console.log(api)
  return (
    <Resource path={api.products}>
      {({ payload, loading }) => {
        let { products, categories, collections } = payload;
        return (
          <section>
            <PromotionCarousel />
            <br />
            <Loadable>
              <CollectionButtonGroup setCollection={setCollection} collections={collections} />
            </Loadable>
            <Grid container direction="row">
              <Col>
                <Loadable>
                  <CategoryButtonGroup setCategory={setCategory} categories={categories && [allCategory, ...categories] || []} />
                </Loadable>
              </Col>
              <Col>
                <Loadable loading={loading}>
                  <ProductsMesh products={products} category={category} />
                </Loadable>
              </Col>
            </Grid>
          </section>
        )
      }}
    </Resource >
  );
}

export default Home;
