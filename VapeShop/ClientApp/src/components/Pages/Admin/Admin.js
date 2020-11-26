import React from 'react';

import { Resource } from '../../utilities/Resource'
import { ProductsManager } from './ProductsManager/ProductsManager'

const Admin = () => {
  return (
    <section className="admin" >
      <Resource path={`api/Categories/WithProducts`} >
        {(props) => <ProductsManager {...props} />}
      </Resource>
    </section>
  );
}

export default Admin;