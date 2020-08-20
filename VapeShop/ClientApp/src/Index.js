import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { Route } from 'react-router-dom';
import { NavMenu } from './components/NavMenu/NavMenu'
import { Grid } from 'react-bootstrap'

import { Home } from './components/Pages/Home/Home';
import { Admin } from './components/Pages/Admin/Admin'
import { ProductsMesh } from './components/Pages/Category/ProductsMesh';
import Switch from 'react-bootstrap/esm/Switch';

// import App from './App';
import './Styles/index.css';
import './Styles/Mesh.scss';
import './Styles/Home.scss';
import './Styles/NavMenu.scss';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Grid >
      <NavMenu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/products' component={ProductsMesh} />
        <Route path='/admin' component={Admin} />
      </Switch>
    </Grid>
  </BrowserRouter>,
  rootElement);
registerServiceWorker();
