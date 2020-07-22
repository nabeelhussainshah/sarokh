import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import ShipperDashboard from '../views/shipper/ShipperDashboard';


function ShipperRouter(props)
{
    return(
        <Switch>
            <SideNavBar>
                <Route exact to="/shipper/dashboard" component={ShipperDashboard} />
            </SideNavBar>
        </Switch>
    );
}

export default ShipperRouter;