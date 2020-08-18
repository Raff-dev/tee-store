import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Styles/index.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { FetchData } from './components/FetchData';
import { NavMenu } from './components/NavMenu'
import { Grid } from 'react-bootstrap'

import { Home } from './components/Pages/Home/Home';
import { Admin } from './components/Pages/Admin/Admin'
import { Products } from './components/Products';
import Switch from 'react-bootstrap/esm/Switch';


const App = (props) => {
    return (
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/fetchdata' component={FetchData} />
                <Route path='/products' component={Products} />
                <Route path='/admin' component={Admin} />
            </Switch>
        </Layout>
    );
}

const Layout = (props) => {
    return (
        <Grid >
            <NavMenu />
            {props.children}
        </Grid>
    );
}

export default App;
