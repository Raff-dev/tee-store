import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Styles/index.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Layout from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const App = (props) => {
  <Layout>
    <BrowserRouter basename={baseUrl}>
      <Route exact path='/' component={Home} />
      <Route path='/fetchdata' component={FetchData} />
    </BrowserRouter>
  </Layout>
}
export default App;