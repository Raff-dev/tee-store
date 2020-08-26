import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { Grid } from 'react-bootstrap'

import registerServiceWorker from './registerServiceWorker';
import Home from './components/Pages/Home/Home';
import Admin from './components/Pages/Admin/Admin'
import Cart from './components/Pages/Cart/Cart'
import { NavMenu } from './components/NavMenu/NavMenu'
import { Category } from './components/Pages/Category/Category'
import { ProductDetail } from './components/Pages/ProductDetail/ProductDetail'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/index.css';
import './Styles/Mesh.scss';
import './Styles/Home.scss';
import './Styles/NavMenu.scss';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl} >
    <Grid>
      <NavMenu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Category/:category' component={Category} />
        <Route path='/Product/:product' component={ProductDetail} />
        <Route path='/Cart' component={Cart} />
        <Route path='/Admin' component={Admin} />
      </Switch>
    </Grid>
  </BrowserRouter>,
  rootElement);
registerServiceWorker();
