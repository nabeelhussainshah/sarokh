import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TrackingInput from '../views/trackingShipment/TrackingInput';
import Header from '../components/TopNav/TrackingShipmentTopNav.jsx';
import ShipmentTrackingProgress from '../views/trackingShipment/ShipmentTrackingProgress';
import AddAddress from '../views/trackingShipment/AddAddress';
import AddArea from '../views/trackingShipment/AddArea';
import { RecoilRoot } from 'recoil';

export default function TrackingShipmentRouter(props) {
	return (
		<RecoilRoot>
			<Switch>
				<Route path="/tracking/input" component={TrackingInput} />
				<NavRoute
					path="/tracking/details"
					component={ShipmentTrackingProgress}
				/>
				<NavRoute path="/tracking/addaddress" component={AddAddress} />
				<NavRoute path="/tracking/addarea" component={AddArea} />
			</Switch>
		</RecoilRoot>
	);
}

const NavRoute = ({ component: Component, ...rest }) => {
	return (
		<Header>
			<Component />
		</Header>
	);
};
