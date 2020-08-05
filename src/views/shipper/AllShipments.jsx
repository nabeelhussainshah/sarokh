import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { allShipmentsApi, deleteShipmentApi } from '../../Api/shipperApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function AllShipments(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		if (response.loading) {
			allShipmentsApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const handleClick = (row) => {
		console.log(row.row.original.id);
		hist.push({
			pathname: '/shipper/shipments/vieworder',
			state: {
				id: row.row.original.id,
			},
		});
	};

	const deleteData = (id) => {
		deleteShipmentApi(id)
			.then((res) => {
				toast.success('Shipment has been deleted successfully');
				setresponse({ ...response, loading: true });
			})
			.catch((err) => {
				toast.error(err.message);
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
						&nbsp;&nbsp;
						<i
							className="fa fa-trash"
							onClick={() => deleteData(row.row.original.id)}
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
			accessor: 'orderId',
		},
		{
			Header: 'Location',
			accessor: 'pickType',
		},
		{
			Header: 'Delievery',
			accessor: 'deliveryType',
		},
		{
			Header: 'Date And Time',
			accessor: 'dateTime',
			Cell: (row) => {
				return (
					<Fragment>
						{moment(row.row.original.dateTime).format('YYYY-MM-DD')}
					</Fragment>
				);
			},
		},
		{
			Header: 'Reciever',
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
						{console.log(item)}
						<ListingContainer>
							<div className="card-header">
								<h2>All Shipments</h2>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									filter={true}
									hiddenColumns={['id']}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
