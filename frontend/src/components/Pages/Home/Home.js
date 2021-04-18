import React, { useContext } from 'react';
import { useState } from 'react';

import { PromotionCarousel } from './PromotionCarousel';
import { CategoryButtonGroup } from './CategoryButtonGroup';
import { ProductsMesh } from './ProductsMesh';
import { Resource } from '../../utilities/Resource';
import { Loadable } from '../../utilities/Loadable';

import { ApiContext } from '../../../contexts/ApiContext';
import { PageSection } from '../../utilities/ThemeComponents';

const Home = (props) => {
  const allCategory = 'All products';
  const api = useContext(ApiContext);

  const [category, setCategory] = useState(allCategory);

  return (
    <Resource path={api.products}>
      {({ payload, loading }) => {
        let { products, categories } = payload;
        return (
          <section>
            <PromotionCarousel />
            <PageSection fluid className="d-flex justify-content-center">
              <Loadable >
                <CategoryButtonGroup setCategory={setCategory} categories={categories ? [allCategory, ...categories] : []} />
              </Loadable>
              <Loadable loading={loading}>
                <ProductsMesh products={products} category={category} />
              </Loadable>
            </PageSection>
          </section>
        );
      }}
    </Resource >
  );
}

export default Home;
