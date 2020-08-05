import React from 'react';
import SideNavBar from '../components/SideNavbar/SideNavbar';
import AdminDashboard from '../views/admin/AdminDashboard';
import { Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { adminRoutes } from '../routes/adminRoutes';
import { toast } from 'react-toastify';

export default function AdminRouter(props) {
	return (
		<Switch>
			<ProtectedRoute
				path="/admin/dashboard"
				component={AdminDashboard}
			/>
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


{/* <Route
    {...rest}
    render={(props) => {
        return <Component {...props} />;
    }}
/> */}