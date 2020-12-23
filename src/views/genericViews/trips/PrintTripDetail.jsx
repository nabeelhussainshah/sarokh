import React from 'react';
import Table from '../../../components/Generictable/generatictable';
import moment from 'moment';

class PrintTripDetail extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				Header: 'Tracking No',
				accessor: 'shipmentOrderId',
			},
			{
				Header: 'Location Name',
				accessor: '',
				Cell: (row) => {
					return <>{row.row.original.pickupLocation}</>;
				},
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
				Header: 'Contact',
				accessor: 'contact',
			},
			{
				Header: 'COD/PPD',
				accessor: '',
			},
			{
				Header: 'Notes',
				accessor: '',
			},
		];
	}

	render() {
		return (
			<div>
				<table className="table custom-table w-100">
					<thead>
						<th colSpan="6">Run Sheet</th>
					</thead>
					<tbody>
						<tr>
							<td align="center">Trip Date & Time:</td>
							<td align="center">
								{' '}
								{moment(this.props.response.data.dispatchDatetime).format(
									'YYYY-MM-DD hh:mm:ss'
								)}
							</td>
							<td align="center">Trip ID:</td>
							<td align="center">{this.props.response.data.id}</td>
						</tr>
						<tr>
							<td align="center">Warehouse Name</td>
							<td align="center"> {this.props.response.data.startPoint}</td>
							<td align="center">Driver</td>
							<td align="center">{this.props.response.data.driverName}</td>
						</tr>
					</tbody>
				</table>

				<h2>Deliveries</h2>
				<br />
				<Table
					data={this.props.response.data.tripDetailItemsList}
					columns={this.columns}
					tableclass={'custom-table w-100'}
					pagination={false}
					filter={false}
					pagesize={Number.MAX_SAFE_INTEGER}
				/>
			</div>
		);
	}
}

export default PrintTripDetail;
