import React, { useState } from 'react';

import { LinkContainer } from 'react-router-bootstrap';
import { Button } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import { Resource } from '../../utilities/Resource';
import { Sidebar } from './Sidebar';
import { DataTable } from './DataTable';

import ModelForm from './ModelForm';
import DeletePrompt from './DeletePrompt';

const Admin = () => {
  const [model, setModel] = useState(null);
  const models = ['Users', 'Categories', 'Products', 'Reviews'];

  return (
    <section className="admin" >
      <Sidebar models={models} setModel={setModel} />
      {model && <Resource model={model} path={`api/${model}`} render={Manager} />}
    </section>
  );
}

const Manager = ({ model, payload, loading }) => {

  function findInstanceById(id) {
    return payload.filter(instance => instance['id'] === parseInt(id));
  }

  return (loading)
    ? <p >Loading...</p>
    : (
      <div>
        <div className="option-header d-flex align-middle p-2">
          <span className="m-4">{model}</span>
          <LinkContainer to={`Create`}>
            <Button className="my-3 " variant="contained">Add New</Button>
          </LinkContainer>
        </div>
        <Switch>
          <Route path={`/Admin/:model/Create`} component={props =>
            <ModelForm {...props} />} />

          <Route path={`/Admin/:model/Read`} component={props =>
            <DataTable entries={payload} {...props} />} />

          <Route path={`/Admin/:model/Delete/:id`} component={props =>
            <DeletePrompt instance={findInstanceById(props.match.params.id)[0]} {...props} />} />

          <Route path={`/Admin/:model/Update/:id`} component={props =>
            <ModelForm instance={findInstanceById(props.match.params.id)[0]} {...props} />} />
        </Switch>
      </div >
    );
}

export default Admin;