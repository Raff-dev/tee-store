import React, { useContext } from 'react';
import { useState } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'

import { PromotionCarousel } from './PromotionCarousel';
import { CategoryButtonGroup } from './CategoryButtonGroup';
import { ProductsMesh } from './ProductsMesh';
import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';

import { ApiContext } from '../../../contexts/ApiContext';

const Home = (props) => {
  const allCategory = 'All products';
  const api = useContext(ApiContext);

  const [category, setCategory] = useState(allCategory);

  console.log(api)
  return (
    <Resource path={api.products}>
      {({ payload, loading }) => {
        let { products, categories } = payload;
        return (
          <section>
            <PromotionCarousel />
            <br />
            <Grid fluid>
              <Col sm={12} md={2}>
                <Loadable>
                  <CategoryButtonGroup setCategory={setCategory} categories={categories && [allCategory, ...categories] || []} />
                </Loadable>
              </Col>
              <Col sm={12} md={10}>
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
