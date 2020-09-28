import React, { useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { trackingOrderDetail } from './state';
import { useRecoilState } from 'recoil';
import moment from 'moment';
import { isEmpty } from 'underscore';
import Loading from '../../components/Loading/Loading';

export default function TrackingProgress(props) {
	const hist = useHistory();
	const [data, setData] = useRecoilState(trackingOrderDetail);
	console.log(data);

	useEffect(() => {
		if (isEmpty(data)) {
			hist.push('/tracking/input');
		}
	}, []);

	return isEmpty(data) ? (
		<Loading />
	) : (
		<Fragment>
			<div className="add-address-container">
				<div className="progress">
					<div
						className="progress-bar"
						role="progressbar"
						style={{ width: '20%' }}
					>
						20%
					</div>
				</div>
				<div
					className="form-row margintop30"
					style={{ justifyContent: 'center' }}
				>
					<div className="col-md-6">
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Tracking No</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.orderId}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Shipper</label>
							</div>
							<div class="col-md-6">
								<p>{data.shipperName}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Receiver Name</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].receiverName}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Contact No</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].contact}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Shipment Title</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].shipmentTitle}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Creation Date</label>
							</div>
							<div class="col-md-6">
								<p>{moment(data.order.createdDatetime).format('DD-MM-YYYY')}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Delivery Type</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.deliveryLocation}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">
									Point Name: (if Point)
								</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.deliveryLocationDetail}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Delivery Address</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].address}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">City</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipToCity}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">
									Cordinates( Lat/Lng )
								</label>
							</div>
							<div class="col-md-6">
								<p>
									{data.order.shipmentOrderItems[0].locationLatitude}
									&nbsp;/&nbsp;
									{data.order.shipmentOrderItems[0].locationLongitude}
								</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Delivery Status</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.status}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-12 mb-2 mt-3">
								<h5 className="font-weight-bolder">Contact Support:</h5>
							</div>
							<div class="col-md-6">
								<label className="font-weight-bold">Contact No</label>
							</div>
							<div class="col-md-6">
								<p>920033995</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label className="font-weight-bold">Email</label>
							</div>
							<div class="col-md-6">
								<p>complaint@sarokh.sa</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
