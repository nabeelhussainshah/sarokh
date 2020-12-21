import React from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import CreateTrip from '../views/warehouseManager/trips/CreateTrip';
import AddDealer from '../views/dealerNetworkManager/dealer/AddDealer';
import AllDealers from '../views/dealerNetworkManager/dealer/AllDealers';
import addPoint from '../views/dealerNetworkManager/dealer/AddPoint';
import allPoints from '../views/dealerNetworkManager/dealer/PointListing';
import { dealerNetworkManagerRoutes } from '../navRoutes/dealerNetworkManager';
import { RecoilRoot } from 'recoil';
import { toast } from 'react-toastify';

function dealerNetworkManager(props) {
	return (
		<RecoilRoot>
			<Switch>
				<ProtectedRoute
					path="/dealerNetworkManager/adddealer/"
					component={AddDealer}
				/>
				<ProtectedRoute
					path="/dealerNetworkManager/alldealers"
					component={AllDealers}
				/>
				<ProtectedRoute
					path="/dealerNetworkManager/addpoint"
					component={addPoint}
				/>
				<ProtectedRoute
					path="/dealerNetworkManager/allpoints"
					component={allPoints}
				/>
			</Switch>
		</RecoilRoot>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar
				routes={dealerNetworkManagerRoutes}
				links={'dealerNetworkManager'}
				redirect="/dealerNetworkManager/adddealer/step1"
			>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

export default dealerNetworkManager;

{
	/* <Route
	{...rest}
	render={(props) => {
		return <Component {...props} />;
	}}
/> */
}
