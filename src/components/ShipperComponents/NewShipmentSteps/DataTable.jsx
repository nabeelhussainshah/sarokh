import React from 'react';
import Table from '../../Generictable/generatictable';
import { useHistory } from 'react-router-dom';
import { newShipment, newShipmentList } from './state';
import { useRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';

export default function DataTable(props) {
	const { t } = useTranslation();
	const hist = useHistory();
	const [data, setdata] = useRecoilState(newShipment);
	const [list, setlist] = useRecoilState(newShipmentList);

	const deleteData = (rowData) => {
		let tempData = [...list];
		tempData.splice(rowData.row.index, 1);
		setlist([...tempData]);
	};

	const editData = (rowData) => {
		setdata({ ...rowData.data[rowData.row.index], editing: true });
		let tempData = [...list];
		console.log('this is the data', tempData.splice(rowData.row.index, 1));
		setlist([...tempData]);
		hist.push('/shipper/newshipment/step1');
	};

	const columns = [
		{
			Header: t('Action'),
			Cell: (row) => {
				return (
					<>
						<i className="fa fa-trash" onClick={() => deleteData(row)}></i>
						{/* &nbsp;&nbsp;
						<i className="fa fa-edit" onClick={() => editData(row)}></i> */}
					</>
				);
			},
		},
		{
			Header: t('Receiver Name'),
			accessor: 'receiverName',
		},
		{
			Header: t('Receiver Contact'),
			accessor: 'receiverContact',
		},
		{
			Header: t('Receiver Address'),
			accessor: 'location[0].label',
		},
		{
			Header: t('Shipment Type'),
			accessor: 'shipmentType',
		},
		{
			Header: t('Shipment Weight'),
			accessor: 'shipmentWeight',
		},
		{
			Header: t('Additional Services'),
			accessor: 'additionalCharges',
		},
		{
			Header: t('Payment Type'),
			accessor: 'billingType',
		},
		{
			Header: t('COD Amount'),
			accessor: 'codValue',
		},
		{
			Header: t('Shipment Cost'),
			accessor: 'shipmentCost',
		},
	];

	return (
		<Table
			data={props.data}
			columns={columns}
			tableclass={'table-responsive custom-table'}
		/>
	);
}
