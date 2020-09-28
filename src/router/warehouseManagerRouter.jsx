import React from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from '../views/warehouseManager/dashboard/WarehouseManagerDashboard';
import CreateTrip from '../views/warehouseManager/trips/CreateTrip';
import AllTrips from '../views/warehouseManager/trips/AllTrips';
import AllDrivers from '../views/warehouseManager/drivers/AllDrivers';
import AllDealers from '../views/warehouseManager/dealers/AllDealers';
import AllShippers from '../views/warehouseManager/shippers/AllShippers';
import AllVehicles from '../views/warehouseManager/vehicles/AllVehicles';
import AllShipments from '../views/warehouseManager/shipments/AllShipments';
import PendingShipments from '../views/warehouseManager/shipments/PendingShipments';
import CodShipments from '../views/warehouseManager/shipments/CodShipments';
import PrepaidShipments from '../views/warehouseManager/shipments/PrepaidShipments';
import PickupShipments from '../views/warehouseManager/shipments/PickupShipments';
import DeliveryShipments from '../views/warehouseManager/shipments/DeliveryShipments';
import { warehouseManagerRoutes } from '../navRoutes/warehouseManagerRoutes';
import { RecoilRoot } from 'recoil';
import { toast } from 'react-toastify';

function WarehouseManagerRouter(props) {
	return (
		<RecoilRoot>
			<Switch>
				<ProtectedRoute
					path="/warehouseManager/dashboard"
					component={Dashboard}
				/>
				<ProtectedRoute
					path="/warehouseManager/createtrip"
					component={CreateTrip}
				/>
				<ProtectedRoute
					path="/warehouseManager/alltrips"
					component={AllTrips}
				/>
				<ProtectedRoute
					path="/warehouseManager/drivers"
					component={AllDrivers}
				/>
				<ProtectedRoute
					path="/warehouseManager/dealers"
					component={AllDealers}
				/>
				<ProtectedRoute
					path="/warehouseManager/shippers"
					component={AllShippers}
				/>
				<ProtectedRoute
					path="/warehouseManager/vehicles"
					component={AllVehicles}
				/>
				<ProtectedRoute
					path="/warehouseManager/allshipments"
					component={AllShipments}
				/>
				<ProtectedRoute
					path="/warehouseManager/pendingshipments"
					component={PendingShipments}
				/>
				<ProtectedRoute
					path="/warehouseManager/codshipments"
					component={CodShipments}
				/>
				<ProtectedRoute
					path="/warehouseManager/prepaidshipments"
					component={PrepaidShipments}
				/>
				<ProtectedRoute
					path="/warehouseManager/pickupshipments"
					component={PickupShipments}
				/>
				<ProtectedRoute
					path="/warehouseManager/deliveryshipments"
					component={DeliveryShipments}
				/>
			</Switch>
		</RecoilRoot>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar routes={warehouseManagerRoutes} links={'warehouseManager'}>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

export default WarehouseManagerRouter;

{
	/* <Route
	{...rest}
	render={(props) => {
		return <Component {...props} />;
	}}
/> */
}
