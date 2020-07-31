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
import AddUser from "../views/shipper/AddUser";
import AllUsers from "../views/shipper/AllUsers";
import NewShipment from "../views/shipper/NewShipment";
import PrintWayBill from "../views/shipper/PrintWayBill";
import PrintBulkShipment from "../views/shipper/PrintBulkShipment";
import BulkShipmentUpload from "../views/shipper/BulkShipmentUpload";
import ShipperSignup from "../views/shipper/ShipperSignup";
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
      <ProtectedRoute exact path="/shipper/users/adduser" component={AddUser} />
      <ProtectedRoute
        exact
        path="/shipper/users/allusers"
        component={AllUsers}
      />
      <ProtectedRoute
        exact
        path="/shipper/printwaybill"
        component={PrintWayBill}
      />
      <ProtectedRoute
        exact
        path="/shipper/printbulkshipment"
        component={PrintBulkShipment}
      />
      <ProtectedRoute
        exact
        path="/shipper/bulkshipmentupload"
        component={BulkShipmentUpload}
      />
      <ProtectedRoute path="/shipper/newshipment" component={NewShipment} />
      <Route path="/shipper/signup" component={ShipperSignup} />
      <Route path='/logout' component={Logout} />

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
    return <Redirect to="/" />;
  }
};

const Logout = () => {
  localStorage.clear();
  toast.success('LOGOUT SUCCESSFUL');
  return <Redirect to="/" />;

}

export default ShipperRouter;
