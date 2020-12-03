import React from 'react';
import Table from '../../../components/Generictable/generatictable';
import moment from 'moment';

class PrintTripDetail extends React.Component {
	constructor() {
		super();
		this.columns = [
			{
				Header: 'Tracking No',
				accessor: 'shipmentOrderId',
			},
			{
				Header: 'Long/lat',
				Cell: (row) => {
					return (
						<>
							{row.row.original.locationLongitude +
								'/' +
								row.row.original.locationLatitude}
						</>
					);
				},
			},
			{
				Header: 'Location',
				accessor: '',
				Cell: (row) => {
					return <>{row.row.original.pickupLocation}</>;
				},
			},
			{
				Header: 'Pickups/Delivery',
				accessor: 'pickupDelivery',
			},
			{
				Header: 'Amount Collect',
				accessor: 'codCollection',
			},
		];
	}

	render() {
		return (
			<Table
				data={this.props.response.data.tripDetailItemsList}
				columns={this.columns}
				tableclass={'custom-table w-75'}
				pagination={false}
				filter={false}
			/>
		);
	}
}

export default PrintTripDetail;
