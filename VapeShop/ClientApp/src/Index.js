import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'

import Home from './components/Pages/Home/Home';
import ProductDetail from './components/Pages/ProductDetail/ProductDetail';
import Cart from './components/Pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import NavMenu from './components/NavMenu/NavMenu'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl} >
    <ToastProvider>
      <NavMenu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Product/:productId/:variantId' component={ProductDetail} />
        <Route path='/Cart' component={Cart} />
      </Switch>
      <Footer />
    </ToastProvider>
  </BrowserRouter>,
  rootElement);
registerServiceWorker();