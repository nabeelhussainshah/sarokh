import React, { useState, useEffect } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import { isUndefined } from 'underscore';

export default function WarehouseDetail(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false, data: [{}] });
	useEffect(() => {
		if (isUndefined(hist.location.state)) {
			hist.goBack();
		}
	}, []);

	const columns = [
		{
			Header: 'Tracking No',
			accessor: '',
		},
		{
			Header: 'Shipper',
			accessor: '',
		},
		{
			Header: 'Delivery Type',
			accessor: 'deliveryType',
		},
		{
			Header: 'Check In',
			accessor: '',
		},
		{
			Header: 'Receiver',
			accessor: 'receiverName',
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
		<div>loading...</div>
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">Warehouse Shipments</h2>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
