import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import SideNavBar from "../components/SideNavbar/SideNavbar";
import { Switch, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ShipperDashboard from "../views/shipper/ShipperDashboard";
import OurLocation from "../views/shipper/OurLocation";
import CodShipments from '../views/shipper/CodShipments';
import {toast} from 'react-toastify';

function ShipperRouter(props) {
  return (
    <Switch>
      <ProtectedRoutes
        exact
        path="/shipper/dashboard"
        component={ShipperDashboard}
      />
      <ProtectedRoutes
        exact
        path="/shipper/ourlocation"
        component={OurLocation}
      />
            <ProtectedRoutes
        exact
        path="/shipper/codshipments"
        component={CodShipments}
      />
    </Switch>
  );
}

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  if (JSON.parse(localStorage.getItem("user"))) {
    return (
      <SideNavBar>
        <Route
          {...rest}
          render={(props) => {
            return <Component {...props} />;
          }}
        />
      </SideNavBar>
    );
  } else {
    toast.error('PLEASE LOGIN');
    return <Redirect to="/login" />;
  }
};
export default ShipperRouter;
