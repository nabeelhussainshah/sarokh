import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function DealerDashboard(props) {
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
							<Container>
								<div className="card-header">
									<h2 className="float-left">Dashboard</h2>
								</div>
								<div className="card-body">
									<div className="shop-img">
										<img src={require('../../../../src/assets/images/shop-img.jpg')} />
									</div>
									<div className="row">
										<div className="col-md-6">
											<div className="dashboard-heading">
												<h2>Welcome To Sarokh Delivery Network</h2>
												<label>Point Name: <span></span></label>
												<br />
												<label>OPerator Name: <span></span></label>
											</div>
										</div>
										<div className="col-md-3">
											<div className="thumnail-box">
												<div className="float-right">
													<p>
														<span className="font20">15</span>
													</p>
												</div>
												<div className="clearfix"></div>
												<div className="float-left">
													<p>
														<span>Available Shipment</span>
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="col-md-3">
											<div className="thumnail-box">
												<div className="float-right">
													<p>
														<span className="font20">SAR 1500/-</span>
													</p>
												</div>
												<div className="clearfix"></div>
												<div className="float-left">
													<p>
														<span>Wallet Balance</span>
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-md-3">
											<div className="thumnail-box">
												<div className="float-right">
													<p>
														<span className="font20">SAR 2000/-</span>
													</p>
												</div>
												<div className="clearfix"></div>
												<div className="float-left">
													<p>
														<span>Cash In</span>
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="col-md-3">
											<div className="thumnail-box">
												<div className="float-right">
													<p>
														<span className="font20">SAR 1500/-</span>
													</p>
												</div>
												<div className="clearfix"></div>
												<div className="float-left">
													<p>
														<span>Cash Out</span>
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="col-md-3">
											<div className="thumnail-box">
												<div className="float-right">
													<p>
														<span className="font20">4</span>
													</p>
												</div>
												<div className="clearfix"></div>
												<div className="float-left">
													<p>
														<span>Shipment In</span>
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="col-md-3">
											<div className="thumnail-box">
												<div className="float-right">
													<p>
														<span className="font20">8</span>
													</p>
												</div>
												<div className="clearfix"></div>
												<div className="float-left">
													<p>
														<span>Shipment Out</span>
													</p>
												</div>
												<div className="clearfix"></div>
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
