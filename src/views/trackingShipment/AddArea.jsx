import React, { useEffect, Fragment } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddArea(props) {
	const hist = useHistory();

	return (
		<Fragment>
			<div className="limiter">
				<div className="container-login100">
					<div className="login100-more">
						<form>
							<fieldset>
								<h1>Sign In to your account</h1>
								<div className="mb-3">
									<div className="form-group">
										<label>User Name</label>
										<input
											name="username"
											type="text"
											className="form-control"
											formcontrolname="username"
											placeholder="Username"
											autoComplete="username"
											required
										/>
									</div>
								</div>
								<div className="mb-4">
									<div className="form-group">
										<label>Password</label>
										<input
											name="password"
											type="password"
											className="form-control"
											formcontrolname="password"
											placeholder="Password"
											autoComplete="current-password"
											required
										/>
									</div>
								</div>
								<div className="col-12">
									<input
										style={{ marginRight: '5px' }}
										type="checkbox"
										className=" px-0"
									/>
									<label>Remember me</label>
								</div>
								<button
									type="submit"
									className="btn btn-danger px-4 float-right"
								>
									Login
								</button>
								<div className="clearfix"></div>
								<div className="col-12">
									<button type="button" className="btn btn-link px-0">
										Forgot password?
									</button>
								</div>
							</fieldset>
						</form>
					</div>

					<div className="wrap-login100">
						<img src={require('../../assets/images/logo.png')} />
					</div>
				</div>
			</div>
		</Fragment>
	);
}
