import React, { useState, useEffect } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import axios from 'axios';
import { useTransition, animated } from 'react-spring';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

export default function ShipmentIssues(props) {
	const { t } = useTranslation();
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		async function fetchData() {
			return await axios
				.get(
					`${process.env.REACT_APP_API}/order/get-issue-shipments/${user.id}`
				)
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

	const columns = [
		{
			Header: t('Info'),
			accessor: '',
			Cell: (row) => {
				return <i className="fa fa-info-circle"></i>;
			},
		},
		{
			Header: t('ID'),
			accessor: '',
		},
		{
			Header: t('Tracking No'),
			accessor: '',
		},
		{
			Header: t('Creation Date'),
			accessor: 'reportedBy',
		},
		{
			Header: t('Date'),
			accessor: '',
		},
		{
			Header: t('Description'),
			accessor: '',
		},
		{
			Header: t('Resolution'),
			accessor: '',
		},
		{
			Header: t('Status'),
			accessor: '',
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
								<h2>{t('Shipment Issues')}</h2>
							</div>
							<div className="card-body">
								<Table
									data={response.data}
									columns={columns}
									tableclass={'table-responsive custom-table'}
									pagination={true}
								/>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
