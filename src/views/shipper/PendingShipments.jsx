import React, { useState, useEffect } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import axios from 'axios';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

export default function PendingShipment(props) {
	const { t } = useTranslation();
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		async function fetchData() {
			return await axios
				.get(`${process.env.REACT_APP_API}/order/get-pending-orders/${user.id}`)
				.then((response) => {
					if (response.data.status === 200) {
						setresponse({ loading: false, data: response.data.data });
					}
				})
				.catch((err) => {
					window.alert(err.message);
				});
		}
		fetchData();
	}, []);

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
	});

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
			Header: t('Action'),
			accessor: '',
			Cell: (row) => {
				return (
					<i className="fa fa-info-circle" onClick={() => handleClick(row)}></i>
				);
			},
		},
		{
			Header: 'id',
			accessor: 'id',
		},
		{
			Header: t('Tracking No'),
			accessor: 'orderId',
		},
		{
			Header: t('Date/Time'),
			accessor: 'dateTime',
			Cell: (row) => {
				return <>{moment(row.row.original.dateTime).format('YYYY-MM-DD')}</>;
			},
		},
		{
			Header: t('Shipment Title'),
			accessor: 'shipmentTitle',
		},
		{
			Header: t('Receiver Name'),
			accessor: 'receiverName',
		},
		{
			Header: t('From'),
			accessor: 'shipFromCity',
		},
		{
			Header: t('To'),
			accessor: 'shipToCity',
		},
		{
			Header: t('Status'),
			accessor: 'status',
		},
	];

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<ListingContainer>
							<div className="card-header">
								<h2>{t('Pending Shipments')}</h2>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
									hiddenColumns={['id']}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
