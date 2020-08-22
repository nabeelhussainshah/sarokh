import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allDealersApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function AddVendor(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

	// useEffect(() => {
	// 	if (response.loading) {
	// 		allDealersApi()
	// 			.then((res) => {
	// 				setresponse({ loading: false, data: res });
	// 			})
	// 			.catch((err) => {
	// 				toast.error(err.message);
	// 			});
	// 	}
	// }, [response.loading]);

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-270px,0,0)',
			transition: 'ease-out 0.3s',
		},
	});

	return response.loading ? (
		<Loading />
	) : (
			transitions.map(
				({ item, props, key }) =>
					item && (
						<animated.div key={key} style={props}>
							<Container>
								<div className="card-header">
									<h2 className="float-left">Add Vendor</h2>
								</div>
								<div className="card-body">
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Company Name</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Company Name"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Contact</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Contact"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Email</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Email"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Address</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Address"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Country</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Country"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">City</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="City"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Commercial Registration No</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Commercial Registration No"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">CR file Upload</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="file upload"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Bank Name</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Bank Name"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Account No: (IBAN)</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Account No: (IBAN)"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Payment API ID</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Payment API ID"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Payment API Key</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Payment API Key"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Payment API URL</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Payment API URL"
											/>
										</div>
										<div className="form-group col-md-6">
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Username</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Username"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Password</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Password"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col-sm-12">
											<button
												type="button"
												className="btn btn-danger flaot-left">
												Cancel
											</button>
											<button
												type="button"
												className="btn btn-danger float-right btnbrown">
												Add Vendor
											</button>
										</div>
									</div>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
