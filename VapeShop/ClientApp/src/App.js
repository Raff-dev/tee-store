import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Styles/index.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { NavMenu } from './components/NavMenu'
import { Grid } from 'react-bootstrap'
import { Products } from './components/Products';


const App = (props) => {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/products' component={Products} />
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
