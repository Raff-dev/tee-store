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
import { Category } from './components/Pages/Home/Category/Category'
import { Product } from './components/Pages/Home/Product/Product'
import { ToastProvider } from 'react-toast-notifications'
import { Resource } from './components/utilities/Resource'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const CategoryRender = ({ match }) => {
  const { category } = match.params;
  console.log('dziaa')

  return (
    <Resource path={`api/Products/OfCategory/${category}`}>
      {props => <Category category={category} {...props} />}
    </Resource>
  );
}

const ProductsRender = ({ match }) => {
  const { id } = match.params;

  return (
    <Resource path={`api/Products/${id}`}>
      {props => <Product id={id} {...props} />}
    </Resource>
  );
}

ReactDOM.render(
  <BrowserRouter basename={baseUrl} >
    <ToastProvider>
      <Grid>
        <NavMenu />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Category/:category' component={CategoryRender} />
          <Route path='/Product/:id' component={ProductsRender} />
          <Route path='/Cart' component={Cart} />
          <Route path='/Admin' component={Admin} />
        </Switch>
      </Grid>
    </ToastProvider>
  </BrowserRouter>,
  rootElement);
registerServiceWorker();


