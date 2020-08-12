import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { CODShipmentsApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function CodShipments(props) {
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
									<h2 className="float-left">Finance Dashboard</h2>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 4500/-</span>
														<br />Sarokh Wallet</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 35000/-</span>
														<br />SAROKH PAY</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 4500/-</span>
														<br />Sarokh Wallet</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 3500/-</span>
														<br />Sarokh Wallet</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 35000/-</span>
														<br />All Drivers Wallet</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 1500/-</span>
														<br />Drivers Compensation</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 25000/-</span>
														<br />Shipper Unbilled</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 1400/-</span>
														<br />Shipper Billed</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 15000/-</span>
														<br />All Dealers Wallet</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 13000/-</span>
														<br />Dealers Compensation</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 1200/-</span>
														<br />COD Pendings</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 1500/-</span>
														<br />Vehicle Maintanace Dues</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
									</div>
									<div className="row finance-detail">
										<div className="col-sm-12">
											<h3 className="mb-3">View All Wallets</h3>
											<h4>Filters</h4>
											<div className="form-row mb-3">
												<div className="col pl-2">
													<input
														type="password"
														name="userPassword"
														className="form-control"
														placeholder="Select User Type (Shipper, Dealer, Driver, Vendor) (Drop down)"
													/>
												</div>
												<div className="col pr-2">
													<input
														type="password"
														name="userPassword"
														className="form-control"
														placeholder="Select User (Filter on bases of User Type) (Show all user in Drop Down)"
													/>
												</div>
											</div>
											<div className="form-row">
												<div className="col-sm-12">
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" />
														<label className="form-check-label">Driver Wallet</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" />
														<label className="form-check-label">Dealer Wallet</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" />
														<label className="form-check-label">Driver Compensation</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" />
														<label className="form-check-label">Dealer Compensation</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" />
														<label className="form-check-label">Shipper COD</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" />
														<label className="form-check-label">Shipper Delivery Charges</label>
													</div>
													<div className="form-check form-check-inline">
														<input className="form-check-input" type="checkbox" />
														<label className="form-check-label">Vendor Pay</label>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
