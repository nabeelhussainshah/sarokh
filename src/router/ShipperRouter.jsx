import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ShipperDashboard from '../views/shipper/ShipperDashboard';


function ShipperRouter(props)
{
    return(
        <Switch>
            <Route path='/shipper'>
            <SideNavBar>
                <Route exact path="/shipper/dashboard" component={ShipperDashboard} />
            </SideNavBar>
            </Route>
        </Switch>
    );
}

export default ShipperRouter;