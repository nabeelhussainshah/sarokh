import React, { lazy } from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import {
	Switch,
	Redirect,
	Route,
} from 'react-router-dom/cjs/react-router-dom.min';
import { dealerRoutes } from '../navRoutes/dealerRoutes';
import { RecoilRoot } from 'recoil';
import { toast } from 'react-toastify';
import DealerDashboard from '../views/dealer/dashboard/DealerDashboard';
import SarokhTask from '../views/dealer/sarokhTask/SarokhTask';

function DealerRouter(props) {
	return (
		<RecoilRoot>
			<Switch>
				<ProtectedRoute path="/dealer/dashboard" component={DealerDashboard} />
				<ProtectedRoute path="/dealer/sarokhTask" component={SarokhTask} />
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
