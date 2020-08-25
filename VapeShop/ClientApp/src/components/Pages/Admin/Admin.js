import React, { useState } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Button } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import { Resource } from '../../utilities/Resource';
import { Sidebar } from './Sidebar'
import { DataTable } from './DataTable';

import ModelForm from './ModelForm';

const Admin = (props) => {
  const [model, setModel] = useState(null);
  const models = ['Users', 'Categories', 'Products', 'Reviews'];

  const Manager = () => {

    const render = (data) => {
      if (data.loading || data.payload.length === 0) return <p >Loading...</p>;

      const entries = data.payload;
      const columns = Object.entries(
        entries[0]).map(([k, v], i) => k);

      return (
        <div>
          <div className="option-header d-flex align-middle p-2">
            <span className="m-4">{model}</span>
            <LinkContainer to={`Create`}>
              <Button className="my-3 " variant="contained">Add New</Button>
            </LinkContainer>
          </div>
          <Switch>
            <Route path={`/Admin/:model/Create`} component={ModelForm} />
            <Route path={`/Admin/:model/Read`} component={({ match }) =>
              <DataTable
                model={match.params.model}
                columns={columns}
                entries={entries} />}
            />
            <Route path={`/Admin/:model/Delete`} component={ModelForm} />
            <Route path={`/Admin/:model/Update`} component={ModelForm} />
          </Switch>
        </div >
      );
    }

    return <Resource path={`api/${model}`} render={render} />
  }

  return (
    <section className="admin" >
      <Sidebar models={models} handleOnClick={setModel} />
      {model && <Manager />}
    </section>
  );
}

export default Admin;