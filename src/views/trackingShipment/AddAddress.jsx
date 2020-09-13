import React, { useEffect, Fragment } from 'react';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddAddress(props) {
	const hist = useHistory();

	return (
		<Fragment>
			<div className="add-address-container">
				<div className="progress">
					<div className="progress-bar" role="progressbar" style={{ width: "20%" }}>20%</div>
				</div>
				<div className="form-row margintop30">
					<div className="col-md-6">
						<div className="form-row">
							<div class="col-md-6">
								<label>Tracking No</label>
							</div>
							<div class="col-md-6">
								<p>00002000021</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Shipper</label>
							</div>
							<div class="col-md-6">
								<p>Naqel</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Receiver Name</label>
							</div>
							<div class="col-md-6">
								<p>Mohammad Ali</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Contact No</label>
							</div>
							<div class="col-md-6">
								<p>96654547845</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Shipment Title</label>
							</div>
							<div class="col-md-6">
								<p>4653468</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Creation Date</label>
							</div>
							<div class="col-md-6">
								<p>15-Aug-2020</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Delivery Type</label>
							</div>
							<div class="col-md-6">
								<p>Last Mile/ Point</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Point Nmae: (if Point)</label>
							</div>
							<div class="col-md-6">
								<p>Point Name</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Delivery Address</label>
							</div>
							<div class="col-md-6">
								<p>Point Address/Customer Address</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>City</label>
							</div>
							<div class="col-md-6">
								<p>Jeddah</p>
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
								<p>Pending/ Delivered</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-6">
								<label>Tracking No:</label>
							</div>
							<div class="col-md-6">
								<p>00002000021</p>
							</div>
						</div>
						<div className="form-row">
							<div class="col-md-12">
								<h5>Contact Support</h5>
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
					<div className="col-md-6">
					</div>
				</div>
			</div>
		</Fragment>
	);
}
