import React from 'react';

import { CategoryCard } from './CategoryCard'
import { PromotionCarousel } from './PromotionCarousel'
import { Resource } from '../../utilities/Resource'
import './Home.scss';
import Card from 'react-bootstrap/Card';

const Home = (props) => {

  return (
    <div>
      <PromotionCarousel />
      <br />
      <Resource path='/api/Categories' >
        {({ payload, loading, refresh }) =>
          <section className="category-mesh">
            {payload.map((item, index) => <CategoryCard item={item} index={index} />)}
          </section>
        }
      </Resource>
    </div>
  );
}

export default Home;
