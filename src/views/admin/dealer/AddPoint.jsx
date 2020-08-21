import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allDealersApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function AddPoint(props) {
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
							<ListingContainer>
								<div className="card-header">
									<h2 className="float-left">Add Point</h2>
								</div>
								<div className="card-body">
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">select Owner</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="select Owner"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Point Name</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Enter Point Name"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Comercial Registration Number</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Select Starting Date"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Comericail Registration Copy:</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="File Upload"
											/>
										</div>
									</div>
									<div className="form-row">
										<div className="form-group col-md-6">
											<label htmlFor="address">Operator Name</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Enter Name"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Operatar Contact Number</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder=" Enter Contact Number"
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
												placeholder="Select City"
											/>
										</div>
									</div>
									<div className="form-row">
									<div className="form-group col-md-6">
											<label htmlFor="address">Post Code</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Enter Post Code"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Upload Point Picture</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Upload File"
											/>
										</div>
									</div>
									<div className="form-row">
									<div className="form-group col-md-6">
											<label htmlFor="address">Point Username</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Select Bank Name
												"
											/>
										</div>
										<div className="form-group col-md-6">
											<label htmlFor="address">Password</label>
											<input
												type="text"
												className="form-control"
												name="address"
												placeholder="Enter IBAN
												"
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
											Finish
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
