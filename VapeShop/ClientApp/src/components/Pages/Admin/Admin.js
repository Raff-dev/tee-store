import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { ButtonGroup, Button } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

import { Resource } from '../../utilities/Resource';
import { DataTable } from './DataTable';
import { AddEntry } from './AddEntry';

export const Admin = (props) => {
  const [models, setModels] = useState(null);
  const [activeModel, setActiveModel] = useState(null);

  const AdminInfo = () => {
    return <h2>Admin</h2>
  }

  const SideBar = (data) => {
    if (data.loading) return <Spinner animation="border" />;

    setModels(data.payload);

    return (
      <ButtonGroup >
        {data.payload.map((model, index) => {
          return (
            <LinkContainer
              key={index}
              exact to={`/Admin/${model}`}
              onClick={() => setActiveModel(model)}>
              <Button variant="secondary">
                {model}
              </Button>
            </LinkContainer>
          );
        })}
      </ButtonGroup >
    );
  }

  const Manager = () => {
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
          <AddEntry />
        </div >
      );
    }

    return <Resource path={`api/${activeModel}`} render={render} />
  }

  return (
    <section className="admin" >
      <Resource
        path="api/Admin/Models"
        render={SideBar} />
      {models && activeModel ? <Manager /> : <AdminInfo />}
    </section>
  );
}

