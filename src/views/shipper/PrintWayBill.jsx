import React, { useState, useEffect, useRef } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactToPrint from 'react-to-print';

export default function PrintWayBill(props) {
	const [response, setresponse] = useState({ loading: true });
	const componentRef = useRef();

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_API}/order/get-all-shipments-trackingnumber`
			)
			.then((response) => {
				if (response.status === 200) {
					setresponse({ loading: false, list: response.data.data });
				} else {
					toast.error('Internal Server Error 500');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleChange = async (value) => {
		if (value !== 'true') {
			await axios
				.get(
					`${process.env.REACT_APP_API}/order/find-shipment-trackingno/${value}`
				)
				.then((res) => {
					console.log(res);
					setresponse({ ...response, content: true, data: res.data.data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return response.loading ? (
		<div>Loading...</div>
	) : (
		<ListingContainer>
			<div>
				<div className="card-header">
					<h2>Print Way Bill</h2>
				</div>
				<div className="card-body">
					<label>Select Tracking Numbers</label>
					<select
						className="form-control mb-5"
						id="status"
						onChange={(e) => {
							handleChange(e.target.value);
						}}
					>
						<option value="true">---Select Order id---</option>
						{response.list.map((doc, i) => {
							return (
								<option key={i} value={doc}>
									{doc}
								</option>
							);
						})}
					</select>

					{response.content === undefined ? null : (
						<>
							<ComponentToPrint1 ref={componentRef} response={response} />
							<ReactToPrint
								trigger={() => (
									<button className="btn btn-primary mt-4 float-right">
										Print this out!
									</button>
								)}
								content={() => componentRef.current}
								pageStyle="width:50%"
							/>
						</>
					)}
				</div>
			</div>
		</ListingContainer>
	);
}

class ComponentToPrint1 extends React.Component {
	render() {
		return (
			<div id="print-section" className="print-order">
				<div className="print-heading">
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="mb-2 text-right"
						>
							<img
								className="mr-3"
								src={require('../../assets/images/sarokh-logo.png')}
							/>
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-left"
						>
							<img
								src={this.props.response.data.shipmentOrderItems[0].qrcode}
								style={{ width: 80 }}
								alt="Logo"
							/>
						</div>
					</div>
				</div>
				<div className="print-body">
					<div className="form-row" style={{ width: '100%' }}>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver Name
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].receiverName}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver Contact
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].contact}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver Address
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							dfadfdf
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6">&nbsp;</div>
						<div className="col-sm-6">&nbsp;</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Receiver City
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							dfadfdf
						</div>
					</div>
					<hr />
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Shipper Name
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							dfadfdf
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Phone Number
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].contact}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Address
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].address}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6">&nbsp;</div>
						<div className="col-sm-6">&nbsp;</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							City
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipFromCity}
						</div>
					</div>
					<hr />
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Pick up Date
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{new Date(
								this.props.response.data.createdDatetime
							).toDateString()}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Delivery Date
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							dfadfdf
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Piece
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							dfadfdf
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Service
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].paymentType}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Weight
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{this.props.response.data.shipmentOrderItems[0].weight}
						</div>
					</div>
					<div className="form-row">
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							Note
						</div>
						<div
							style={{ width: '50%', textAlign: 'center' }}
							className="text-center"
						>
							{
								this.props.response.data.shipmentOrderItems[0]
									.additionalServices
							}
						</div>
					</div>
					<hr />
					<div className="print-footer">
						<div className="form-row">
							<div
								style={{ width: '50%', textAlign: 'center' }}
								className="text-center"
							>
								<img
									src={this.props.response.data.shipmentOrderItems[0].barCode}
									alt="Logo"
								/>
								<p>{this.props.response.data.orderId}</p>
							</div>
							<div
								style={{ width: '50%', textAlign: 'center' }}
								className="text-left font40"
							>
								JED
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
