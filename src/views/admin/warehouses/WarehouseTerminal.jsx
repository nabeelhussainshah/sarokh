import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	allDealersApi,
	pointListingApi,
	deletePointApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function WarehouseTerminal(props) {
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
									<h2 className="float-left">Warehouse Terminal</h2>
								</div>
								<div className="card-body">
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Warehouse</label>
											<select
												name="shipperId"
												className="form-control"
											>
												<option value="true">Select Warehouse</option>
											</select>
										</div>
										<div className="col"></div>
									</div>
									<div className="form-row mb-3 mt-3">
										<div className="col">
											<label>Tracking Number</label>
											<div className="input-group mb-3">
												<input type="text" class="form-control" placeholder="Recipient's username" />
												<div className="input-group-append">
													<button className="btn btn-success" type="button" id="button-addon2">Enter</button>
												</div>
											</div>
										</div>
										<div className="col">
											<label>Select Driver</label>
											<input
												type="text"
												name="userName"
												className="form-control"
												placeholder="Select Driver"
												defaultValue={""}
											/>
										</div>
									</div>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
