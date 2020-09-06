import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function TopNav(props) {
	return (
		<div className="hold-transition sidebar-mini layout-fixed">
			<div className="wrapper">
				<nav className="main-header navbar navbar-expand navbar-white navbar-light">
					{/* Left navbar links */}
					<ul className="navbar-nav">
						<Fragment>
							<li className="nav-item d-none d-sm-inline-block">
								<Link to="/shipper/printwaybill" className="nav-link">
									Add Address
								</Link>
							</li>
							<li className="nav-item d-none d-sm-inline-block">
								<Link to="/shipper/newshipment/step1" className="nav-link">
									Select Point
								</Link>
							</li>
						</Fragment>
					</ul>
				</nav>

				<div className="content-wrapper">{props.children}</div>
			</div>
		</div>
	);
}

export default TopNav;
