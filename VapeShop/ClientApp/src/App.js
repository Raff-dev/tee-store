import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Styles/index.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { NavMenu } from './components/NavMenu/NavMenu'
import { Grid } from 'react-bootstrap'

import { Home } from './components/Pages/Home/Home';
import { Admin } from './components/Pages/Admin/Admin'
import { ProductsMesh } from './components/Pages/Category/ProductsMesh';
import Switch from 'react-bootstrap/esm/Switch';


const App = (props) => {
    return (
        <Grid >
            <NavMenu />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/products' component={ProductsMesh} />
                <Route path='/admin' component={Admin} />
            </Switch>
        </Grid>
    );
}


export default App;