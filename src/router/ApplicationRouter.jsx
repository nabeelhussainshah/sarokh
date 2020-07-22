import React from 'react';
import { BrowserRouter,Route,Switch} from 'react-router-dom';
import Login from '../views/login';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import '../styles/global.css';


function ApplicationRouter(porps)
{
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path='/login'>
                <Login />
            </Route>
            <SideNavBar>
            <Route exact path='/dashboard' />
            </SideNavBar>
        </Switch>
        </BrowserRouter>
    );
}

export default ApplicationRouter;