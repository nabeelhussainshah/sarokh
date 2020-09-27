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
								<label>Tracking No</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.orderId}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Shipper</label>
							</div>
							<div class="col-md-6">
								<p>{data.shipperName}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Receiver Name</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].receiverName}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Contact No</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].contact}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Shipment Title</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipmentOrderItems[0].shipmentType}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Creation Date</label>
							</div>
							<div class="col-md-6">
								<p>{moment(data.order.createdDatetime).format('DD-MM-YYYY')}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Delivery Type</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.pickupLocation}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Point Name: (if Point)</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.pickupLocationDetail}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Delivery Address</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.address}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>City</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.shipToCity}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Cordinates</label>
							</div>
							<div class="col-md-6">
								<p>Long/Lat</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Delivery Status</label>
							</div>
							<div class="col-md-6">
								<p>{data.order.status}</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-12 mb-2 mt-2">
								<h5>Contact Support:</h5>
							</div>
							<div class="col-md-6">
								<label>Contact No</label>
							</div>
							<div class="col-md-6">
								<p>920033995</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Email</label>
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
