import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from './components/Pages/Home/Home';
import ProductDetail from './components/Pages/ProductDetail/ProductDetail';
import Cart from './components/Pages/Cart/Cart'
import Checkout from './components/Pages/Checkout/Checkout'
import CheckoutComplete from './components/Pages/Checkout/CheckoutComplete'

import Footer from './components/Footer/Footer'
import NavMenu from './components/NavMenu/NavMenu'

import { CartProvider } from './contexts/CartContext'
import { ApiProvider } from './contexts/ApiContext'
import { publishableKey } from './secret'

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const stripePromise = loadStripe(publishableKey);

ReactDOM.render(
  <BrowserRouter basename={baseUrl} >
    <Elements stripe={stripePromise}>
      <ApiProvider>
        <CartProvider>
          <NavMenu />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/Product/:productId/:variantId' component={ProductDetail} />
            <Route path='/Cart' component={Cart} />
            <Route exact path='/Checkout' component={Checkout} />
            <Route path='/Checkout/Complete' component={CheckoutComplete} />
          </Switch>
          <Footer />
        </CartProvider>
      </ApiProvider>
    </Elements>
  </BrowserRouter>,
  rootElement);
registerServiceWorker();

