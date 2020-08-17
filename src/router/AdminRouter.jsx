import React from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import AdminDashboard from '../views/admin/dashboard/AdminDashboard';
import DriverLocation from '../views/admin/tracking/DriverLocation';
import OrderLocation from '../views/admin/tracking/OrderLocation';
import AllShipments from '../views/admin/shipments/AllShipments';
import PendingShipments from '../views/admin/shipments/PendingShipments';
import DeliveredShipments from '../views/admin/shipments/DeliveredShipments';
import CodShipments from '../views/admin/shipments/CodShipments';
import PrepaidShipments from '../views/admin/shipments/PrepaidShipments';
import ReturnShipments from '../views/admin/shipments/ReturnShipments';
import PickupShipments from '../views/admin/shipments/PickupShipments';
import DeliveryShipments from '../views/admin/shipments/DeliveryShipments';
import ShipmentIssues from '../views/admin/shipments/ShipmentIssues';
import AllShippers from '../views/admin/shippers/AllShippers';
import ShipperBilling from '../views/admin/shippers/ShipperBilling';
import AddUser from '../views/admin/users/AddUser';
import AllUsers from '../views/admin/users/AllUsers';
import AddShipperWarehouse from '../views/admin/warehouses/AddShipperWarehouse';
import AddDriver from '../views/admin/drivers/AddDriver';
import FinanceDashboard from '../views/admin/finance/FinanceDashboard';
import CreateTrip from '../views/admin/scheduling/CreateTrip';
import AllTrips from '../views/admin/scheduling/AllTrips';
import AddVehicle from '../views/admin/Vehicle/AddVehicle';
import AllVehicles from '../views/admin/Vehicle/AllVehicle';
import MaintenanceRecords from '../views/admin/Vehicle/MaintenanceRecords';
import AddDealer from '../views/admin/dealer/AddDealer';
import CreateBill from '../views/admin/finance/CreateBill';
import PaymentRecord from '../views/admin/finance/RecordPayment';
import BillDetail from '../views/admin/finance/BillDetail';
import { Switch, Redirect } from 'react-router-dom';
import { adminRoutes } from '../routes/adminRoutes';
import { toast } from 'react-toastify';

export default function AdminRouter(props) {
	return (
		<Switch>
			<ProtectedRoute path="/admin/dashboard" component={AdminDashboard} />
			<ProtectedRoute
				path="/admin/tracking/driverlocations"
				component={DriverLocation}
			/>
			<ProtectedRoute
				path="/admin/tracking/orderlocations"
				component={OrderLocation}
			/>
			<ProtectedRoute
				path="/admin/shipments/allshipments"
				component={AllShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/deliveredshipments"
				component={DeliveredShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/pendingshipments"
				component={PendingShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/CODshipments"
				component={CodShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/prepaidshipments"
				component={PrepaidShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/returnshipments"
				component={ReturnShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/pickupshipments"
				component={PickupShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/deliveryshipments"
				component={DeliveryShipments}
			/>
			<ProtectedRoute
				path="/admin/shipments/shipmentissues"
				component={ShipmentIssues}
			/>
			<ProtectedRoute
				path="/admin/shippers/allshippers"
				component={AllShippers}
			/>
			<ProtectedRoute
				path="/admin/shippers/shipperbilling"
				component={ShipperBilling}
			/>

			<ProtectedRoute path="/admin/users/adduser" component={AddUser} />
			<ProtectedRoute path="/admin/users/allusers" component={AllUsers} />
			<ProtectedRoute
				path="/admin/warehouses/"
				component={AddShipperWarehouse}
			/>
			<ProtectedRoute path="/admin/drivers/" component={AddDriver} />
			<ProtectedRoute
				path="/admin/finance/dasboard"
				component={FinanceDashboard}
			/>
			<ProtectedRoute
				path="/admin/vehicles/addvehicle"
				component={AddVehicle}
			/>
			<ProtectedRoute
				path="/admin/vehicles/allvehicles"
				component={AllVehicles}
			/>

			<ProtectedRoute
				path="/admin/vehicles/maintenancerecords"
				component={MaintenanceRecords}
			/>

			<ProtectedRoute path="/admin/dealer/" component={AddDealer} />
			<ProtectedRoute path="/admin/finance/createbill" component={CreateBill} />
			<ProtectedRoute
				path="/admin/finance/paymentrecord"
				component={PaymentRecord}
			/>
			<ProtectedRoute path="/admin/finance/billdetail" component={BillDetail} />
			<ProtectedRoute
				path="/admin/scheduling/createtrip"
				component={CreateTrip}
			/>

			<ProtectedRoute path="/admin/scheduling/alltrips" component={AllTrips} />
		</Switch>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar routes={adminRoutes} links={'admin'}>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

{
	/* <Route
    {...rest}
    render={(props) => {
        return <Component {...props} />;
    }}
/> */
}
