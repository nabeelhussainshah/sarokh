import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { adminDashboard } from '../../../Api/adminApi';
import { toast } from 'react-toastify';
import Loading from '../../../components/Loading/Loading';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';

export default function AdminDashboard(props) {
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		adminDashboard()
			.then((res) => {
				setresponse({ loading: false, data: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	return response.loading ? (
		<Loading />
	) : (
		<Container>
			<div className="pr-3 pl-3">
				<div className="row mt-4">
					<div className="col-sm-6 col-lg-3">
						<div className="card text-white bg-info">
							<div className="card-body pb-4">
								<div className="text-value">{response.data.totalOrders}</div>
								<div>Total Orders</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-3">
						<div className="card text-white bg-primary">
							<div className="card-body pb-4">
								<div className="text-value">
									{response.data.inProgressOrders}
								</div>
								<div>Order in Progress</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-3">
						<div className="card text-white bg-warning">
							<div className="card-body pb-4">
								<div className="text-value">
									{response.data.pendingDelivery}
								</div>
								<div>Pending Delivery</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-3">
						<div className="card text-white bg-danger">
							<div className="card-body pb-4">
								<div className="text-value">{response.data.pendingPickups}</div>
								<div>Pending Pickups</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-9">
						<div className="card">
							<div className="card-body">
								<div className="row">
									<div className="col-sm-12">
										<GoogleMapComponent
											isMarkerShown={true}
											position={[
												{ label: 'sup', latitude: 23.8859, longitude: 39.1925 },
											]}
											label={true}
											changefunction={setresponse}
											googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
											loadingElement={
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}
											containerElement={
												<div
													style={{
														height: `400px`,
														width: `100%`,
														margin: `50px auto`,
													}}
												/>
											}
											mapElement={<div style={{ height: `100%` }} />}
											autocomplete={false}
										/>
									</div>
								</div>
								<div className="chart-wrapper"></div>
							</div>
						</div>
					</div>
					<div className="col-3">
						<div className="row">
							<div className="col-12">
								<div className="card text-white bg-warning">
									<div className="card-body pb-4">
										<div className="text-value">
											{response.data.walletPickups}
										</div>
										<div>Wallet Pickups</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="card text-white bg-primary">
									<div className="card-body pb-4">
										<div className="text-value">{response.data.codPayable}</div>
										<div>COD Payable</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="card text-white bg-info">
									<div className="card-body pb-4">
										<div className="text-value">
											{response.data.prepaidOrdersReceivable}
										</div>
										<div>Prepaid Order Receivable</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="card text-white bg-primary">
									<div className="card-body pb-4">
										<div className="text-value">
											{response.data.agentsPayable}
										</div>
										<div>Agent's Payables</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="card text-white bg-danger">
									<div className="card-body pb-4">
										<div className="text-value">
											{response.data.agentsReceivable}
										</div>
										<div>Agent's Recieveables</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="card text-white bg-warning">
									<div className="card-body pb-4">
										<div className="text-value">
											{response.data.driverReceivable}
										</div>
										<div>Driver Recieveables</div>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="card text-white bg-primary">
									<div className="card-body pb-4">
										<div className="text-value">
											{response.data.driverPayable}
										</div>
										<div>Driver Payable</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
