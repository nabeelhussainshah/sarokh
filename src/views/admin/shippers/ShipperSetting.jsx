import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allShippersApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function ShipperSetting(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

	// useEffect(() => {
	// 	if (response.loading) {
	// 		allShippersApi()
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
							{console.log(item)}
							<ListingContainer>
								<div className="card-header">
									<h2 className="float-left">Shipper Setting</h2>
								</div>
								<div className="card-body shippersetting">
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Select Shipper</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Shipper"
											/>
										</div>
										<div className="col">
											<div className="btn-group btn-group-toggle float-right mt-4" data-toggle="buttons">
												<label className="btn btn-secondary active">
													<input type="radio" name="options" id="option1" checked /> Disable
  												</label>
												<label className="btn btn-secondary">
													<input type="radio" name="options" id="option2" /> Enable
  												</label>
											</div>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col-sm-4">
											<h3>Pickup Setting</h3>
											<div className="form-check form-check-inline">
												<label className="form-check-label width138">Sarokh Point</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Enable</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Disable</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<label className="form-check-label width138">Shipper Warehouse</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Enable</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Disable</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<label className="form-check-label width138">Sarokh Warehouse</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Enable</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Disable</label>
											</div>
										</div>
										<div className="col-sm-4">
											<h3>Delivery Setting</h3>
											<div className="form-check form-check-inline">
												<label className="form-check-label width125">Sarokh Point</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Enable</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Disable</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<label className="form-check-label width125">Last Mile</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Enable</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Disable</label>
											</div>
											<div className="clearfix"></div>
											<div className="form-check form-check-inline">
												<label className="form-check-label width125">Customer Choice</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Enable</label>
											</div>
											<div className="form-check form-check-inline">
												<input className="form-check-input" type="radio" />
												<label className="form-check-label">Disable</label>
											</div>
										</div>
										<div className="col-sm-4">
											<h3>Notes:</h3>
											<textarea className="form-control"></textarea>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-12">
											<h3>Billing Setting</h3>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Up to 5 Kg</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Enter Amount"
											/>
										</div>
										<div className="col">
											<label>Last Mile</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Enter Amount"
											/>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Up to 10 kg</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Enter Amount"
											/>
										</div>
										<div className="col">
											<label>Normal Packaging</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Enter Amount"
											/>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Upto 15 kg</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Enter Amount"
											/>
										</div>
										<div className="col">
											<label>Gift Packaging</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Enter Amount"
											/>
										</div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Return Shipment Charges; (Undelivered)</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Enter Amount"
											/>
										</div>
										<div className="col">
											<label>Insurance Percentage</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Enter Percentage"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-12">
											<button
												type="button"
												className="btn btn-danger float-left">
												Discard
          									</button>
											<button
												type="button"
												className="btn btn-danger float-right btnbrown">
												Save
          									</button>
										</div>
									</div>
								</div>
							</ListingContainer>
						</animated.div>
					)
			)
		);
}
