import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import { toast } from 'react-toastify';
import { useTransition, animated } from 'react-spring';
import Loading from '../../../components/Loading/Loading';
import { dashboardApi } from '../../../Api/warehouseManagerApi';
import { sarokhWarehouseList } from '../../../Api/generalApi';

export default function WarehouseManagerDashboard() {
	const [response, setresponse] = useState({
		loading: true,
		warehouseDetail: {},
	});

	useEffect(() => {
		sarokhWarehouseList()
			.then((res) => {
				console.log(res);
				setresponse({ ...response, loading: false, warehouses: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	const columns = [
		{
			Header: 'Tracking Number',
			accessor: 'trackingNumber',
		},
		{
			Header: 'Pickup Type',
			accessor: 'pickupType',
		},
		{
			Header: 'Delivery Type',
			accessor: 'deliveryType',
		},
		{
			Header: 'Receiver Name',
			accessor: 'receiverName',
		},
		{
			Header: 'Shipper',
			accessor: 'shipper',
		},
		{
			Header: 'Payment Type',
			accessor: 'paymentType',
		},
		{
			Header: 'Status',
			accessor: 'status',
		},
	];

	const getWarehouseDetail = async (e) => {
		if (e.target.value !== 'none') {
			await dashboardApi(e.target.value)
				.then((res) => {
					setresponse({ ...response, warehouseDetail: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

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
								<h2 className="float-left">Warehouse Dashboard</h2>
							</div>
							<div className="card-body">
								<div className="form-row mt-3">
									<div className="col-md-6">
										<label htmlFor="1">Select Warehouse</label>
										<select
											id="1"
											className="form-control"
											onChange={getWarehouseDetail}
										>
											<option value="none">--select warehouse---</option>
											{response.warehouses.map((doc) => {
												return <option value={doc.id}>{doc.name}</option>;
											})}
										</select>
									</div>
								</div>
								<div className="row mt-4">
									<div className="col-sm-6 col-lg-4">
										<div className="card text-white bg-info">
											<div className="card-body pb-4">
												<div className="text-value">
													{response.warehouseDetail.totalShipments}
												</div>
												<div>Total Orders</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6 col-lg-4">
										<div className="card text-white bg-primary">
											<div className="card-body pb-4">
												<div className="text-value">
													{response.warehouseDetail.shipmentsAboutToReceive}
												</div>
												<div>Orders in Progress</div>
											</div>
										</div>
									</div>
									<div className="col-sm-6 col-lg-4">
										<div className="card text-white bg-warning">
											<div className="card-body pb-4">
												<div className="text-value">
													{response.warehouseDetail.deliveriesDue}
												</div>
												<div>Pending Deliveries</div>
											</div>
										</div>
									</div>
								</div>
								<div className="mt-2">
									<Table
										data={response.warehouseDetail.shipments || []}
										columns={columns}
										tableclass={'table-responsive custom-table'}
										pagination={true}
										filter={true}
									/>
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
