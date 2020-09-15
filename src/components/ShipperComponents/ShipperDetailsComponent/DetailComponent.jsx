import React from 'react';
import moment from 'moment';

export default function ContentContainer({ response, items }) {
	return (
		<div>
			<div className="shipper-detail-container mt-3 mb-5">
				<h2 className="font20 redcolor">Shipment Delivery Status</h2>
				<div className="progress">
					<div className="progress-bar" role="progressbar" style={{ width: "25%" }}>25%</div>
				</div>
				<div className="clearfix"></div>
			</div>
			<h2 className="mt-3 mb-1 font20 redcolor">Shipper Bill Detail</h2>

			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Tracking No</td>
						<td style={{ width: '30%' }}>{items.trackingNumber}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Creation (Date & Time)
						</td>
						<td style={{ width: '30%' }}>
							{moment(response.createdDatetime).format('DD MM YYYY hh:mm:ss')}
						</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>From City</td>
						<td style={{ width: '30%' }}>{response.shipFromCity}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Pickup Location
						</td>
						<td style={{ width: '30%' }}>{response.pickupLocation}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>To City</td>
						<td style={{ width: '30%' }}>{response.shipToCity}</td>
						<td style={{ fontWeight: 'bold' }}>Delivery Location</td>
						<td style={{ width: '30%' }}>{response.deliveryLocation}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Receiver Confirmation
						</td>
						<td>{response.receiverConfirmation}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Delivered Date/Time
						</td>
						<td>{response.deliveryDate}</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-3 mb-1 font20 redcolor">Receiver Detail</h2>
			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Receiver Name</td>
						<td style={{ width: '30%' }}>{items.receiverName}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Receiver Contact
						</td>
						<td style={{ width: '30%' }}>{items.contact}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Receiver Address
						</td>
						<td style={{ width: '30%' }}>{items.address}</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-3 mb-1 font20 redcolor">Parcel Detail</h2>
			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Title</td>
						<td style={{ width: '30%' }}>{items.shipmentTitle}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Type</td>
						<td style={{ width: '30%' }}>{items.shipmentType}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Shipment Value</td>
						<td style={{ width: '30%' }}>{items.shipmentValue}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Shipment Weight
						</td>
						<td style={{ width: '30%' }}>{items.weight}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Shipment Content
						</td>
						<td style={{ width: '30%' }}>{items.shipmentContent}</td>
					</tr>
				</tbody>
			</table>

			<h2 className="mt-3 mb-1 font20 redcolor">Billing Details</h2>
			<table className="table table-resposive">
				<tbody>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Payment Type</td>
						<td style={{ width: '30%' }}>{items.paymentType}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Cash On Delivery (COD)</td>
						<td style={{ width: '30%' }}>{items.codAmount}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Additional Services
						</td>
						<td style={{ width: '30%' }}>{items.additionalServices}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>
							Additional Services Charges
						</td>
						<td style={{ width: '30%' }}>{items.additionalCharges}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}>Delivery Charges</td>
						<td style={{ width: '30%' }}>{items.shipmentDeliveryCharges}</td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Receiver Address Surcharge</td>
						<td style={{ width: '30%' }}>{items.vat}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}></td>
						<td style={{ width: '30%' }}></td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Subtotal</td>
						<td style={{ width: '30%' }}>{items.vat}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}></td>
						<td style={{ width: '30%' }}></td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>VAT (15%)</td>
						<td style={{ width: '30%' }}>{items.vat}</td>
					</tr>
					<tr>
						<td style={{ fontWeight: 'bold' }}></td>
						<td style={{ width: '30%' }}></td>
						<td style={{ fontWeight: 'bold', width: '20%' }}>Total</td>
						<td style={{ width: '30%' }}>{items.vat}</td>
					</tr>
				</tbody>
			</table>

		</div >
	);
}
