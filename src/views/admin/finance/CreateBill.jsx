import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { CODShipmentsApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function CreateBill(props) {
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
							{console.log(item)}
							<Container>
								<div className="card-header">
									<h2 className="float-left">Create Bill</h2>
								</div>
								<div className="card-body">
									<div className="form-row">
										<div className="col-sm-6">
											<div className="form-check form-check-inline">
												<label className="form-check-label">Select Bill Type</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Invoice</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Credit Note</label>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-check form-check-inline">
												<label className="form-check-label">Billed Category</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Shipment Charges</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">COD</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Compensation</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Others</label>
											</div>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>User Type</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select User Type (Shipper, Dealer, Driver) (Drop down)"
											/>
										</div>
										<div className="col">
											<label>Bill To</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder=" Select Bill Receiver"
											/>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Bill Date</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Date Bill Created (Auto Fill Current Date)"
											/>
										</div>
										<div className="col">
											<label>Due Date</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Select Due Date"
											/>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Start Date</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Starting Date of Billing Period"
											/>
										</div>
										<div className="col">
											<label>End Date</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Select Ending Date of Billing Period"
											/>
										</div>
									</div>
									<div className="col-sm-12 creatbill">
										<h2>Others</h2>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Item</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Starting Date of Billing Period"
											/>
										</div>
										<div className="col">
											<label>Unit Price</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Select Ending Date of Billing Period"
											/>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Units</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Starting Date of Billing Period"
											/>
										</div>
										<div className="col">
											<label>Amount</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Select Ending Date of Billing Period"
											/>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col-sm-12 mb-3">
											<button
												type="button"
												className="btn btn-danger float-left btnbrown"
												onClick={() => {
													props.formToggle({ form: false }); //this will hide the form
												}}
											>
												Get Detail
          									</button>
											<p className="float-right">Total Amount: <span>SAR 1750.70/-</span></p>
										</div>
										<div className="col-sm-12">
											<button
												type="button"
												className="btn btn-danger float-left btnbrown"
												onClick={() => {
													props.formToggle({ form: false }); //this will hide the form
												}}
											>
												Select All
          									</button>
											<button
												type="button"
												className="btn btn-success btngreen float-right"
												onClick={() => {
													props.formToggle({ form: false }); //this will hide the form
												}}
											>
												Generate Bill
          									</button>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col-sm-12">
											<button
												type="button"
												className="btn btn-danger float-left btnbrown"
												onClick={() => {
													props.formToggle({ form: false }); //this will hide the form
												}}
											>
												Add row
          									</button>
											<button
												type="button"
												className="btn btn-success btngreen float-right"
												onClick={() => {
													props.formToggle({ form: false }); //this will hide the form
												}}
											>
												Generate Bill
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
