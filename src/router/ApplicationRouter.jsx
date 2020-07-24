import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from '../views/login';
import ShipperRouter from './ShipperRouter';
import '../styles/global.css';


function ApplicationRouter(porps)
{
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path='/login'>
                <Login />
            </Route>
        </Switch>
        <ShipperRouter />
        <Route render={props => {return <div>ROUTE NOT FOUND</div>}} />
        </BrowserRouter>
    );
}

export default ApplicationRouter;