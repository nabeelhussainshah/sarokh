import React, { lazy } from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { dealerRoutes } from '../navRoutes/dealerRoutes';
import { RecoilRoot } from 'recoil';
import { toast } from 'react-toastify';
import DealerDashboard from '../views/dealer/dashboard/DealerDashboard';
import SarokhTask from '../views/dealer/sarokhTask/SarokhTask';
import DeliverShipment from '../views/dealer/DeliverShipment/DeliverShipment';
import ReceiveShipment from '../views/dealer/ReceiveShipment/ReceiveShipment';
import SarokhPay from '../views/dealer/sarokhPay/SarokhPay';

function DealerRouter(props) {
	return (
		<RecoilRoot>
			<Switch>
				<ProtectedRoute path="/dealer/dashboard" component={DealerDashboard} />
				<ProtectedRoute path="/dealer/sarokhTask" component={SarokhTask} />
				<ProtectedRoute
					path="/dealer/deliverShipment"
					component={DeliverShipment}
				/>
				<ProtectedRoute
					path="/dealer/ReceiveShipment"
					component={ReceiveShipment}
				/>
				<ProtectedRoute path="/dealer/SarokhPay" component={SarokhPay} />
			</Switch>
		</RecoilRoot>
	);
}

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (JSON.parse(localStorage.getItem('user'))) {
		return (
			<SideNavBar routes={dealerRoutes} links={'dealer'}>
				<Component />
			</SideNavBar>
		);
	} else {
		toast.error('PLEASE LOGIN');
		return <Redirect to="/" />;
	}
};

export default DealerRouter;
