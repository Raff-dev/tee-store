import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './Styles/index.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Items } from './components/Items';
import { NavMenu } from './components/NavMenu'
import { Grid } from 'react-bootstrap'





const App = (props) => {
    return (
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/fetchdata' component={FetchData} />
            <Route path='/items' component={Items} />
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
