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
import Footer from './components/Footer/Footer'
import NavMenu from './components/NavMenu/NavMenu'
import { ToastProvider } from 'react-toast-notifications'

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
      <Grid>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Cart' component={Cart} />
          <Route path='/Admin' component={Admin} />
        </Switch>
      </Grid>
      <Footer />
    </ToastProvider>
  </BrowserRouter>,
  rootElement);
registerServiceWorker();