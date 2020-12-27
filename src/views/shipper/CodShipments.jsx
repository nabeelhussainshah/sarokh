import React, { useState, useEffect } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import axios from 'axios';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

export default function CodShipment(props) {
	const { t } = useTranslation();
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		async function fetchData() {
			return await axios
				.get(`${process.env.REACT_APP_API}/order/get-COD-shipments/${user.id}`)
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
			Header: t('COD Amount'),
			accessor: 'codAmount',
		},
		{
			Header: t('Status'),
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
								<h2>{t('COD Shipments')}</h2>
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
