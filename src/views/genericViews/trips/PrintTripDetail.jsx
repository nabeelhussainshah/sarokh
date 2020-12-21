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
			<div>
				<table className="table custom-table w-100">
					<thead>
						<th colSpan="6">Run Sheet</th>
					</thead>
					<tbody>
						<tr>
							<td align="center">Trip Date & Time:</td>
							<td align="center">(autofill from system)</td>
							<td align="center">Trip ID:</td>
							<td align="center">(autofill from system)</td>
						</tr>
						<tr>
							<td align="center">Trip Date & Time:</td>
							<td align="center">(autofill from system)</td>
							<td align="center">Trip ID:</td>
							<td align="center">(autofill from system)</td>
						</tr>
					</tbody>
				</table>
				<div className="form-row">
					<div className="col-sm-6">
						<label className="col-sm-6 col-6"> Trip ID:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">{this.props.response.data.id}</p>
						</label>
					</div>
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Warehouse:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.startPoint}
							</p>
						</label>
					</div>
				</div>
				<div className="form-row">
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Driver Name:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.driverName}
							</p>
						</label>
					</div>
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">City:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.vehicle.warehouse.city}
							</p>
						</label>
					</div>
				</div>
				<div className="form-row">
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Vehicle:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{this.props.response.data.vehicle.name}
							</p>
						</label>
					</div>
					<div className="col-sm-6">
						<label className="col-sm-6 col-6">Date:</label>
						<label className="col-sm-6 col-6">
							<p className=" text-left">
								{moment(this.props.response.data.dispatchDatetime).format(
									'YYYY-MM-DD hh:mm:ss'
								)}
							</p>
						</label>
					</div>
				</div>
				<h2>Deliveries</h2>
				<br/>
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
