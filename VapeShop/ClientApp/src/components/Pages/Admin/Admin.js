import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

import { Resource } from '../../utilities/Resource';
import { Sidebar } from './Sidebar'
import { DataTable } from './DataTable';

import { UsersForm } from './ModelForm/UsersForm'
import { CategoriesForm } from './ModelForm/CategoriesForm'
import { ProductsForm } from './ModelForm/ProductsForm'
import { ReviewsForm } from './ModelForm/ReviewsForm'
import { MediasForm } from './ModelForm/MediasForm'
import { NotFound } from './ModelForm/NotFound'


export const Admin = (props) => {
  const [activeModel, setActiveModel] = useState(null);

  const AdminInfo = () => {
    return <h2>Admin</h2>
  }
  const Submit = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(JSON.stringify(values, null, 2));
  }
  const Manager = () => {


    const GetForm = (model) => {
      switch (model) {
        case 'Users': return <UsersForm submit={Submit} />;
        case 'Categories': return <CategoriesForm submit={Submit} />;
        case 'Products': return <ProductsForm submit={Submit} />;
        case 'Reviews': return <ReviewsForm submit={Submit} />;
        case 'Medias': return <MediasForm submit={Submit} />;
        default: return <NotFound />;
      }
    }

    const render = (data) => {
      if (data.loading || data.payload.length === 0) return <Spinner animation="border" />;

      const entries = data.payload;
      const columns = Object.entries(
        entries[0]).map(([k, v], i) => k);

      return (
        <div>
          <div className="option-header">
            <h2>{activeModel}</h2>
          </div>
          <DataTable columns={columns} entries={entries} />
          {GetForm(activeModel)}
        </div >
      );
    }

    return <Resource path={`api/${activeModel}`} render={render} />
  }

  return (
    <section className="admin" >
      <Sidebar onClick={setActiveModel} />
      {activeModel ? <Manager /> : <AdminInfo />}
    </section>
  );
}

