import React, { useEffect, Fragment } from 'react';
import axios from 'axios';
import Header from '../../components/TopNav/TrackingShipmentTopNav.jsx';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TrackingInput(props) {
	const hist = useHistory();

	return (
		<Fragment>
			<div className="limiter">
				<div className="container-login100">
					<div className="col-md-8 p-0">
						<div className="wrap-login100">
							<img src={require('../../assets/images/logo.png')} />
						</div>
					</div>
					<div className="col-md-4 p-0 brownbg">
						<div className="login100-more">
							<form autoComplete="on">
								<fieldset>
									<div className="mb-3">
										<div className="form-group">
											<label>Enter Tracking Number</label>
											<input
												name="username"
												type="text"
												className="form-control"
												formcontrolname="username"
												placeholder="Enter Tracking Number"
												autoComplete="username"
												required
											/>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-danger px-4 float-right"
									>
										Search
									</button>
									<div className="clearfix"></div>
								</fieldset>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
