import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allVehiclesApi, deleteVehicleApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function AllShipments(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

	// useEffect(() => {
	// 	if (response.loading) {
	// 		allVehiclesApi()
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
									<h2 className="float-left">Vendor detail</h2>
								</div>
								<div className="card-body">
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Business Name:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Email:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Contact Number:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Address:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Country:</label>
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
											<label className="col-sm-6 col-6">Commercial Registration Number:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Bank Name:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">CR Copy:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Account No:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Payment Api URL</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Payment API Key</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
									<div className="form-row">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Payment API ID</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left"></p>
											</label>
										</div>
									</div>
								</div>
								
							</ListingContainer>
						</animated.div>
					)
			)
		);
}
