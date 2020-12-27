import React, { useState, useEffect } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import Table from '../../components/Generictable/generatictable';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { getBills } from '../../Api/shipperApi';
import { toast } from 'react-toastify';
import { filter } from 'underscore';
import { useTranslation } from 'react-i18next';

export default function Bills(props) {
	const { t } = useTranslation();
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		getBills()
			.then((res) => {
				setresponse({ loading: false, data: shipperFilter(res) });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	function shipperFilter(data) {
		const result = filter(data, function (doc) {
			return doc.billTo === JSON.parse(localStorage.getItem('user')).id;
		});
		console.log(result);
		if (result !== undefined) {
			return result;
		} else {
			return [];
		}
	}

	const handleClick = (row) => {
		console.log(row.row.original.id);
		hist.push({
			pathname: '/admin/shipments/vieworder',
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
					<i
						className="fa fa-info-circle"
						handleClick={() => handleClick(row)}
					></i>
				);
			},
		},
		{
			Header: t('Bill Type'),
			accessor: 'billType',
		},
		{
			Header: t('Bill Category'),
			accessor: 'billCategory',
		},
		{
			Header: t('Due Date'),
			accessor: 'dueDate',
		},
		{
			Header: t('Amount'),
			accessor: 'totalAmount',
		},
		{
			Header: t('From'),
			accessor: 'shipFromCity',
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
								<h2>{t('View Bills')}</h2>
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
