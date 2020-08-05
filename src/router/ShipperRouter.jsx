import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import ShipperDashboard from '../views/shipper/ShipperDashboard';
import CodShipments from '../views/shipper/CodShipments';
import PendingShipments from '../views/shipper/PendingShipments';
import ShippmentIssues from '../views/shipper/ShipmentIssues';
import AllShipments from '../views/shipper/AllShipments';
import ShipmentDetails from '../views/shipper/ShipmentDetails';
import AddUser from '../views/shipper/AddUser';
import AllUsers from '../views/shipper/AllUsers';
import NewShipment from '../views/shipper/NewShipment';
import PrintWayBill from '../views/shipper/PrintWayBill';
import PrintBulkShipment from '../views/shipper/PrintBulkShipment';
import BulkShipmentUpload from '../views/shipper/BulkShipmentUpload';
import ShipperSignup from '../views/shipper/ShipperSignup';
import AddShipperWarehouseFormRoutes from '../views/shipper/AddShipperWarehouseFormRoutes';
import { shipperRoutes } from '../routes/shipperRoutes';
import { toast } from 'react-toastify';

function ShipperRouter(props) {
	return (
		<Switch>
			<ProtectedRoute path="/shipper/dashboard" component={ShipperDashboard} />
			<ProtectedRoute path="/shipper/codshipments" component={CodShipments} />
			<ProtectedRoute
				path="/shipper/pendingshipments"
				component={PendingShipments}
			/>
			<ProtectedRoute
				path="/shipper/shipmentissues"
				component={ShippmentIssues}
			/>
			<ProtectedRoute path="/shipper/allshipments" component={AllShipments} />
			<ProtectedRoute
				path="/shipper/shipments/vieworder"
				component={ShipmentDetails}
			/>
			<ProtectedRoute exact path="/shipper/users/adduser" component={AddUser} />
			<ProtectedRoute path="/shipper/users/allusers" component={AllUsers} />
			<ProtectedRoute path="/shipper/printwaybill" component={PrintWayBill} />
			<ProtectedRoute
				path="/shipper/printbulkshipment"
				component={PrintBulkShipment}
			/>
			<ProtectedRoute
				path="/shipper/bulkshipmentupload"
				component={BulkShipmentUpload}
			/>
			<ProtectedRoute
				exact
				path="/shipper/newshipment"
				component={NewShipment}
			/>
			<ProtectedRoute
				path="/shipper/addshipperwarehouse"
				component={AddShipperWarehouseFormRoutes}
			/>
			<Route path="/shipper/signup" component={ShipperSignup} />
		</Switch>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar routes={shipperRoutes} links={'shipper'}>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

export default ShipperRouter;

{/* <Route
	{...rest}
	render={(props) => {
		return <Component {...props} />;
	}}
/> */}