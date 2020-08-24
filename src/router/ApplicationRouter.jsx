import React from 'react';
import {
	BrowserRouter,
	Route,
	Switch,
	HashRouter,
	Redirect,
} from 'react-router-dom';
import Login from '../views/login';
import ShipperRouter from './ShipperRouter';
import AdminRouter from './AdminRouter';
import BusinessSignup from '../views/sign-ups/ShipperSignup';
import IndividualSignup from '../views/sign-ups/IndividualSignUp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';

function ApplicationRouter(porps) {
	toast.configure({
		position: 'bottom-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	return (
		<HashRouter>
			<Switch>
				<Route exact={true} path="/">
					<Login />
				</Route>
				<Route exact={true} path="/logout" component={Logout} />
				<Route path="/business/signup" component={BusinessSignup} />
				<Route path="/individual/signup" component={IndividualSignup} />
			</Switch>
			<AdminRouter />
			<ShipperRouter />
		</HashRouter>
	);
}

const Logout = () => {
	localStorage.clear();
	toast.success('LOGOUT SUCCESSFUL');
	return <Redirect to="/" />;
};

export default React.memo(ApplicationRouter);
