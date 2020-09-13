import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { shipperBillingApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function ShipperDetail(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

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
							<ListingContainer>
								<div className="card-header">
									<h2 className="float-left">Shipper Detail</h2>
								</div>
								<div className="card-body">
									<form >
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Shipper Owner First Name</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Shipper Owner First Name"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Shipper Owner Last Name</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Shipper Owner Last Name"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Contact No</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Contact No"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Email</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Email"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">National ID/ Iqama Number</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="National ID/ Iqama Number"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Upload Copy of ID Card/ Iqama</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Upload Copy of ID Card/ Iqama"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Buiness Name</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Buiness Name"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Account Type</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Account Type"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">VAT Number</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="First Name"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Commercial Registration Number</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Commercial Registration Number"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Commercial Registration Copy</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Commercial Registration Copy"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Bank Name</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Bank Name"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">IBAN</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="IBAN"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Select Country</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Select Country"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Select City</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Select City"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Office/ Billing Address</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Office/ Billing Address"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Business Name</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Business Name"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Account Type</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Account Type"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">VAT Number</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="VAT Number"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Commercial Registration Number</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Commercial Registration Number"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Commercial Registration Copy</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Commercial Registration Copy"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Bank Name</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Bank Name"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">BAN</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="BAN"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Select Country</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Select Country"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Select City</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="First Name"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Office/ Billing Address</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Office/ Billing Address"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Post Code</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Post Code"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Concern Person</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Concern Person"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Designation</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Designation"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Email</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Email"
												/>

											</div>
										</div>
										<div className="form-row">
											<div className="form-group col-md-6">
												<label htmlFor="firstName">Username</label>
												<input
													type="text"
													className="form-control"
													name="firstName"
													placeholder="Username"
												/>
											</div>
											<div className="form-group col-md-6">
												<label htmlFor="lastName">Password</label>
												<input
													type="text"
													className="form-control"
													name="lastName"
													placeholder="Password"
												/>

											</div>
										</div>
										<div class="form-row">
											<div class="col-sm-12">
												<div class="btn-container float-right">
													<button class="btn btn-success" type="submit">Update</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</ListingContainer>
						</animated.div>
					)
			)
		);
}
