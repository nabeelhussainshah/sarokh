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

	const columns = [
		{
			Header: 'Action',
			accessor: '',
		},
		{
			Header: 'Tracking Number',
			accessor: '',
		},
		{
			Header: 'Shipper',
			accessor: '',
		},
		{
			Header: 'Location No',
			accessor: '',
		},
		{
			Header: 'Destination Address',
			accessor: '',
		},
		{
			Header: 'COD',
			accessor: '',
		},
	];

	const columns1 = [
		{
			Header: 'Action',
			accessor: '',
		},
		{
			Header: 'Dealer Name',
			accessor: '',
		},
		{
			Header: 'Wallet Balance',
			accessor: '',
		},
		{
			Header: 'Destination Address',
			accessor: '',
		},
	];

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
								<h2 className="float-left">Create Trip</h2>
							</div>
							<div className="card-body">
								<div className="form-row mb-3">
									<div className="col">
										<select
											className="form-control"
											id="status"
											formControlName="warehouse"
										>
											<option value="">--- Select Warehouse ---</option>
										</select>
									</div>
									<div className="col">
										<select
											className="form-control"
											id="status"
											formControlName="vehical"
										>
											<option value="">--- Select Vehical ---</option>
										</select>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<select
											className="form-control"
											id="status"
											formControlName="driver"
										>
											<option value="">--- Select Driver ---</option>
										</select>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col-sm-12">
										<button type="submit" class="btn btn-success mb-3">
											Fetch Details
										</button>
										<div class="clearfix"></div>
									</div>
								</div>
								<div className="row">
									<div className="flex-row col-md-2">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">45</span>
													<br />
													Point Pick up
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-2">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">45</span>
													<br />
													Shipper Pick up
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-2">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">45</span>
													<br />
													Deliveries to Point
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-2">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">45</span>
													<br />
													Deliveries to Lastmile
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-2">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">45</span>
													<br />
													Lastmile COD
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
									<div className="flex-row col-md-2">
										<div className="thumnail-box custom-dashboard-box">
											<div className="icon color-default fs-26 mr-10 float-left">
												<i className="fa fa-usd font40"></i>
											</div>
											<div className="float-left">
												<p>
													<span className="font20">45</span>
													<br />
													Point Collection
												</p>
											</div>
											<div className="clearfix"></div>
										</div>
									</div>
								</div>
							</div>
							<Table
								data={[{}]}
								columns={columns}
								tableclass={'table-responsive custom-table'}
								pagination={true}
								filter={true}
							/>
							<div className="margintop30">
								<Table
									data={[{}]}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
