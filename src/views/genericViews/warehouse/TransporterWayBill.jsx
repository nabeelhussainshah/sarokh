import React from 'react';
import Table from '../../../components/Generictable/generatictable';
import moment from 'moment';

class TransporterWayBill extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [
			{
				Header: 'Tracking No',
				accessor: 'shipmentOrderId',
			},
			{
				Header: 'Weight',
				accessor: 'weight',
			},
			{
				Header: 'Origin',
				accessor: '',
			},
			{
				Header: 'Destination',
				accessor: '',
			},
			{
				Header: 'Notes',
				accessor: '',
			},
			{
				Header: 'Check',
				accessor: '',
			},
		];
	}

	render() {
		return (
			<div>
				<table className="table custom-table w-100">
					<thead>
						<th colSpan="6">Transporter Waybill</th>
					</thead>
					<tbody>
						<tr>
							<td align="center">Date:</td>
							<td align="center">
								{' '}
								{moment(this.props.response.list.createdDatetime).format(
									'YYYY-MM-DD hh:mm:ss'
								)}
							</td>
							<td align="center">ETA:</td>
							<td align="center">{this.props.response.list.eta}</td>
						</tr>
						<tr>
							<td align="center">Origin:</td>
							<td align="center"> {this.props.response.list.pickupLocation}</td>
							<td align="center">Destination:</td>
							<td align="center">
								{this.props.response.list.deliveryLocation}
							</td>
						</tr>
						<tr>
							<td align="center">Warehouse Name</td>
							<td align="center">
								{' '}
								{this.props.response.list.pickupLocationDetail}
							</td>
							<td align="center">Driver</td>
							<td align="center">{this.props.response.data.driverName}</td>
						</tr>
						<tr>
							<td align="center">Transporter Name:</td>
							<td align="center"> {this.props.response.list.driver?.name}</td>
							<td align="center">Waybill #</td>
							<td align="center">{this.props.response.list.waybill}</td>
						</tr>
						<tr>
							<td align="center">Total PCs:</td>
							<td align="center"> {this.props.response.list.pcs}</td>
							<td align="center"></td>
							<td align="center"></td>
						</tr>
						<tr>
							<td align="center">Origin WH Supervisor:</td>
							<td align="center"> </td>
							<td align="center">Destination WH Supervisor</td>
							<td align="center"></td>
						</tr>
					</tbody>
				</table>

				<br />
				<Table
					data={
						this.props.response.list?.shipmentOrderItems
							? this.props.response.list.shipmentOrderItems
							: []
					}
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

export default TransporterWayBill;
