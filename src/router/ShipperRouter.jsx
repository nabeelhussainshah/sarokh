import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import SideNavBar from "../components/SideNavbar/SideNavbar";
import { Switch, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import ShipperDashboard from "../views/shipper/ShipperDashboard";
import OurLocation from "../views/shipper/OurLocation";
import CodShipments from "../views/shipper/CodShipments";
import PendingShipments from "../views/shipper/PendingShipments";
import ShippmentIssues from "../views/shipper/ShipmentIssues";
import AllShipments from "../views/shipper/AllShipments";
import ShipmentDetails from "../views/shipper/ShipmentDetails";
import AddUserForm from "../views/shipper/AddUserForm";
import { toast } from "react-toastify";

function ShipperRouter(props) {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/shipper/dashboard"
        component={ShipperDashboard}
      />
      <ProtectedRoute
        exact
        path="/shipper/ourlocation"
        component={OurLocation}
      />
      <ProtectedRoute
        exact
        path="/shipper/codshipments"
        component={CodShipments}
      />
      <ProtectedRoute
        exact
        path="/shipper/pendingshipments"
        component={PendingShipments}
      />
      <ProtectedRoute
        exact
        path="/shipper/shipmentissues"
        component={ShippmentIssues}
      />
      <ProtectedRoute
        exact
        path="/shipper/allshipments"
        component={AllShipments}
      />
      <ProtectedRoute
        exact
        path="/shipper/shipments/vieworder"
        component={ShipmentDetails}
      />
      <ProtectedRoute
        exact
        path="/shipper/users/adduser"
        component={AddUserForm}
      />
    </Switch>
  );
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
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
    toast.error("PLEASE LOGIN");
    return <Redirect to="/login" />;
  }
};
export default ShipperRouter;
