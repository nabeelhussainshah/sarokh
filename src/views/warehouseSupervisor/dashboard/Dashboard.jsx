import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import { toast } from 'react-toastify';
import { useTransition, animated } from 'react-spring';
import Loading from '../../../components/Loading/Loading';
import { dashboardApi } from '../../../Api/warehouseManagerApi';

export default function WarehouseSupervisorDashboard() {
	const [response, setresponse] = useState({
		loading: true,
		warehouseDetail: {},
	});

	useEffect(() => {
		dashboardApi()
			.then((res) => {
				setresponse({ loading: false, warehouseDetail: res });
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
								<h2 className="float-left">Warehouse Inventory</h2>
							</div>
							<div className="card-body">
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
