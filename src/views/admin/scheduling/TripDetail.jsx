import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allShipmentsApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function TripDetail(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

	// useEffect(() => {
	// 	if (response.loading) {
	// 		allShipmentsApi()
	// 			.then((res) => {
	// 				setresponse({ loading: false, data: res });
	// 			})
	// 			.catch((err) => {
	// 				toast.error(err.message);
	// 			});
	// 	}
	// }, [response.loading]);

	const handleClick = (row) => {
		console.log(row.row.original.id);
		hist.push({
			pathname: '/shipper/shipments/vieworder',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const columns = [
		{
			Header: 'Action',
			accessor: '',
			Cell: (row) => {
				return (
					<Fragment>
						<i
							className="fa fa-info-circle"
							onClick={() => handleClick(row)}
						></i>
					</Fragment>
				);
			},
		},
		{
			Header: 'id',
			accessor: 'id',
		},
		{
			Header: 'tracking No',
			accessor: 'shipmentId',
		},
		{
			Header: 'Date And Time',
			accessor: 'dateTime',
		},
		{
			Header: 'Shipper',
			accessor: 'shipper',
		},
		{
			Header: 'Current Location',
			accessor: 'currentLocation',
		},

		{
			Header: 'Destination City',
			accessor: 'destinationCity',
		},
		{
			Header: 'Status',
			accessor: 'status',
		},
	];

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
									<h2 className="float-left">Trip Detail</h2>
								</div>
								<div className="card-body">
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6"> Trip ID:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Warehouse:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Driver Name:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">City:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Vehicele:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Date:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="row mt-3">
										<div className="flex-row col-md-3">
											<div className="thumnail-box custom-dashboard-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">45</span>
														<br />
														Pick ups
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box custom-dashboard-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">35</span>
														<br />
														Deliveries
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box custom-dashboard-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">SAR 3500/-</span>
														<br />
														Amount Collected
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div className="flex-row col-md-3">
											<div className="thumnail-box custom-dashboard-box">
												<div className="icon color-default fs-26 mr-10 float-left">
													<i className="fa fa-usd font40"></i>
												</div>
												<div className="float-left">
													<p>
														<span className="font20">7</span>
														<br />
														Locations
													</p>
												</div>
												<div className="clearfix"></div>
											</div>
										</div>
										<div class="col-sm-12 creatbill">
											<h2>Trip Summary</h2>
										</div>
									</div>
								</div>
							</ListingContainer>
						</animated.div>
					)
			)
		);
}
