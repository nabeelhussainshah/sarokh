import React, { useEffect, Fragment } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login(props) {
	const hist = useHistory();
	toast.configure({
		position: 'bottom-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

	const onSubmit = async (event) => {
		event.preventDefault();
		const Form = new FormData(event.target);
		let data = {};
		for (let a of Form.entries()) {
			data[a[0]] = a[1];
		}

		await axios
			.post(`http://vps789305.ovh.net:8443/user/login`, {
				...data,
			})
			.then(async (response) => {
				if (response.data.status === 401) {
					toast.error('WRONG USERNAME OR PASSWORD');
				} else {
					await localStorage.setItem(
						'user',
						JSON.stringify(response.data.data)
					);
					const user = await JSON.parse(localStorage.getItem('user'));
					console.log(user);
					toast.success('LOGIN SUCCESS');
					if (user.user !== undefined) {
						if (user.user.userType === 'Shipper') {
							setTimeout(() => {
								hist.push('/shipper/dashboard');
							}, 2000);
						}
					} else if (user.userType === 'Admin') {
						setTimeout(() => {
							hist.push('/admin/dashboard');
						}, 2000);
					}
				}
			});
	};

	useEffect(() => {
		// const trees = $('[data-widget="treeview"]');
		// trees.init();
		return () => {
			hist.go(); //reloading the application makes the dropdown in the nav working
		};
	}, []);

	return (
		<Fragment>
			<div className="limiter">
				<div className="container-login100">
					<div className="login100-more">
						<form onSubmit={onSubmit}>
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
									<input style={{ marginRight: '5px' }} type="checkbox" className=" px-0" />
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
						<img src={require('../assets/images/logo.png')} />
					</div>
				</div>
			</div>



			{/* <div className="app-body login-testimonial-container">
				<main className="main d-flex align-items-center">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-sm-6 mx-auto">
								<div className="card-group">
									<div className="card p-5 custom-border">
										<div className="card-body">
											<form onSubmit={onSubmit}>
												<fieldset>
													<h1>Login</h1>
													<p className="text-muted">Sign In to your account</p>
													<div className="input-group mb-3">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<i className="fas fa-user" />
															</span>
														</div>
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
													<div className="input-group mb-4">
														<div className="input-group-prepend">
															<span className="input-group-text">
																<i className="fa fa-lock" />
															</span>
														</div>
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
													<div className="row">
														<div className="col-6">
															<button
																type="submit"
																className="btn btn-danger px-4"
															>
																Login
														</button>
														</div>
														<div className="col-6 text-right">
															<button type="button" className="btn btn-link px-0">
																Forgot password?
														</button>
														</div>
														<div className="col-12 text-right">
															<label>Remember me</label>
															<input type="checkbox" className=" px-0" />
														</div>
													</div>
												</fieldset>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div> */}
		</Fragment >
	);
}

export default Login;
