import React, { useState, useEffect, useRef } from 'react';
import ListingContainer from '../../components/Containers/ListingContainer';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../assets/images/sarokh-logo.png';
import ReactToPrint from 'react-to-print';

export default function PrintWayBill(props) {
	const [response, setresponse] = useState({ loading: true });
	const componentRef = useRef();

	const printBill = () => {
		var content = document.getElementById('print-section');
		var pri = document.getElementById('ifmcontentstoprint').contentWindow;
		pri.document.open();
		pri.document.write(content.innerHTML);
		pri.document.close();
		pri.focus();
		pri.print();
	};

	const showBill = () => {
		var content = document.getElementById('print-section');
		var pri = document.getElementById('ifmcontentstoprint').contentWindow;
		pri.document.open();
		pri.document.write(content.innerHTML);
		pri.document.close();
	};

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
	console.log(response);
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
					{/* <ComponentToPrint response={response} /> */}

					{response.content === undefined ? null : (
						<>
							{/* <button
								onClick={() => printBill()}
								className="btn btn-primary mt-4 float-right"
							>
								print
							</button>
							{setTimeout(() => showBill(), 100)} */}

							<ComponentToPrint1 ref={componentRef} response={response} />
							<ReactToPrint
								trigger={() => (
									<button className="btn btn-primary mt-4 float-right">
										Print this out!
									</button>
								)}
								content={() => componentRef.current}
								pageStyle="width:50%"
								onBeforePrint={(abc) => {
									console.log(abc);
								}}
							/>
						</>
					)}
				</div>
			</div>
		</ListingContainer>
	);
}

const ComponentToPrint = ({ response }) => {
	return (
		<>
			{response.content === undefined ? null : (
				<>
					<div id="print-section" className="print-order">
						<div className="print-heading">
							<div className="form-row">
								<div className="col-sm-6 mb-2 text-right">
									<img src={require('../../assets/images/sarokh-logo.png')} />
								</div>
								<div className="col-sm-6 text-left">
									<img
										src={response.data.shipmentOrderItems[0].qrcode}
										style={{ width: 80 }}
										alt="Logo"
									/>
								</div>
							</div>
						</div>
						<div className="print-body">
							<div className="form-row">
								<div className="col-sm-6 mt-2 text-center">Receiver Name</div>
								<div className="col-sm-6 mt-2 text-center">
									{response.data.shipmentOrderItems[0].receiverName}
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Receiver Contact</div>
								<div className="col-sm-6 text-center">
									{response.data.shipmentOrderItems[0].contact}
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Receiver Address</div>
								<div className="col-sm-6 text-center">dfadfdf</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6">&nbsp;</div>
								<div className="col-sm-6">&nbsp;</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Receiver City</div>
								<div className="col-sm-6 text-center">dfadfdf</div>
							</div>
							<hr />
							<div className="form-row">
								<div className="col-sm-6 text-center">Shipper Name</div>
								<div className="col-sm-6 text-center">dfadfdf</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Phone Number</div>
								<div className="col-sm-6 text-center">
									{response.data.shipmentOrderItems[0].contact}
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Address</div>
								<div className="col-sm-6 text-center">
									{response.data.shipmentOrderItems[0].address}
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6">&nbsp;</div>
								<div className="col-sm-6">&nbsp;</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">City</div>
								<div className="col-sm-6 text-center">
									{response.data.shipFromCity}
								</div>
							</div>
							<hr />
							<div className="form-row">
								<div className="col-sm-6 text-center">Pick up Date</div>
								<div className="col-sm-6 text-center">
									{new Date(response.data.createdDatetime).toDateString()}
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Delivery Date</div>
								<div className="col-sm-6 text-center">dfadfdf</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Piece</div>
								<div className="col-sm-6 text-center">dfadfdf</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Service</div>
								<div className="col-sm-6 text-center">
									{response.data.shipmentOrderItems[0].paymentType}
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Weight</div>
								<div className="col-sm-6 text-center">
									{response.data.shipmentOrderItems[0].weight}
								</div>
							</div>
							<div className="form-row">
								<div className="col-sm-6 text-center">Note</div>
								<div className="col-sm-6 text-center">
									{response.data.shipmentOrderItems[0].additionalServices}
								</div>
							</div>
							<hr />
							<div className="print-footer">
								<div className="form-row">
									<div className="col-sm-6 text-center">
										<img
											src={response.data.shipmentOrderItems[0].barCode}
											alt="Logo"
										/>
										<p>{response.data.orderId}</p>
									</div>
									<div className="col-sm-6 text-left font40">JED</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

class ComponentToPrint1 extends React.Component {
	render() {
		return (
			<div id="print-section" className="print-order">
				<div className="print-heading">
					<div className="form-row">
						<div className="col-sm-6 mb-2 text-right">
							<img src={require('../../assets/images/sarokh-logo.png')} />
						</div>
						<div className="col-sm-6 text-left">
							<img
								src={this.props.response.data.shipmentOrderItems[0].qrcode}
								style={{ width: 80 }}
								alt="Logo"
							/>
						</div>
					</div>
				</div>
				<div className="print-body">
					<div className="form-row">
						<div className="col-sm-6 mt-2 text-center">Receiver Name</div>
						<div className="col-sm-6 mt-2 text-center">
							{this.props.response.data.shipmentOrderItems[0].receiverName}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Receiver Contact</div>
						<div className="col-sm-6 text-center">
							{this.props.response.data.shipmentOrderItems[0].contact}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Receiver Address</div>
						<div className="col-sm-6 text-center">dfadfdf</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6">&nbsp;</div>
						<div className="col-sm-6">&nbsp;</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Receiver City</div>
						<div className="col-sm-6 text-center">dfadfdf</div>
					</div>
					<hr />
					<div className="form-row">
						<div className="col-sm-6 text-center">Shipper Name</div>
						<div className="col-sm-6 text-center">dfadfdf</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Phone Number</div>
						<div className="col-sm-6 text-center">
							{this.props.response.data.shipmentOrderItems[0].contact}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Address</div>
						<div className="col-sm-6 text-center">
							{this.props.response.data.shipmentOrderItems[0].address}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6">&nbsp;</div>
						<div className="col-sm-6">&nbsp;</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">City</div>
						<div className="col-sm-6 text-center">
							{this.props.response.data.shipFromCity}
						</div>
					</div>
					<hr />
					<div className="form-row">
						<div className="col-sm-6 text-center">Pick up Date</div>
						<div className="col-sm-6 text-center">
							{new Date(
								this.props.response.data.createdDatetime
							).toDateString()}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Delivery Date</div>
						<div className="col-sm-6 text-center">dfadfdf</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Piece</div>
						<div className="col-sm-6 text-center">dfadfdf</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Service</div>
						<div className="col-sm-6 text-center">
							{this.props.response.data.shipmentOrderItems[0].paymentType}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Weight</div>
						<div className="col-sm-6 text-center">
							{this.props.response.data.shipmentOrderItems[0].weight}
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-6 text-center">Note</div>
						<div className="col-sm-6 text-center">
							{
								this.props.response.data.shipmentOrderItems[0]
									.additionalServices
							}
						</div>
					</div>
					<hr />
					<div className="print-footer">
						<div className="form-row">
							<div className="col-sm-6 text-center">
								<img
									src={this.props.response.data.shipmentOrderItems[0].barCode}
									alt="Logo"
								/>
								<p>{this.props.response.data.orderId}</p>
							</div>
							<div className="col-sm-6 text-left font40">JED</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
