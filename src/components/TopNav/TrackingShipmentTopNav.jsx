import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

function TopNav(props) {
	return (
		<div className="hold-transition sidebar-mini layout-fixed">
			<div className="wrapper whitebg">
				<nav className="main-header tracking-nav navbar navbar-expand navbar-white navbar-light">
					{/* Left navbar links */}
					<ul className="navbar-nav">
						<Fragment>
							<li className="nav-item d-none d-sm-inline-block">
								<NavLink
									to="/tracking/addaddress"
									className="nav-link"
									activeClassName="active"
								>
									Last Mile
								</NavLink>
							</li>
							<li className="nav-item d-none d-sm-inline-block">
								<NavLink
									to="/tracking/addarea"
									className="nav-link"
									activeClassName="active"
								>
									Select Point
								</NavLink>
							</li>
						</Fragment>
					</ul>
				</nav>

				<div className="content-wrapper tracking-nav ">{props.children}</div>
			</div>
		</div>
	);
}

export default TopNav;
