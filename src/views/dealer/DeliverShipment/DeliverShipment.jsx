import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { searchShipmentApi, handoverShipmentApi } from '../../../Api/dealerApi';

export default function DeliverShipment(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [shipmentData, setShipmentData] = useState([]);
	const [trackingNo, setTrackingNo] = useState("");

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-270px,0,0)',
			transition: 'ease-out 0.3s',
		},
	});

	const initialValues = {
		trackingNo: ""
	}

	const formSchema = Yup.object().shape({
		trackingNo: Yup.string().required("* Required")
	});

	const initialValues2 = {
		otp: "",
		codAmount: ""
	}

	const formSchema2 = Yup.object().shape({
		codAmount: Yup.string().required("* Required")
	});

	const onSubmitForm = async (values) => {
		await searchShipmentApi(values.trackingNo).then(res => {
			setTrackingNo(values.trackingNo);
			setShipmentData(res);
		});
	}

	const onSubmitForm2 = async (values) => {
		debugger;
		const handoverShipmentPayload = {
			codcharges: values.codAmount,
			delivererName: JSON.parse(localStorage.getItem("user")).operatorName,
			receivedDateTime: new Date(),
			receiverName: shipmentData.receiverName,
			shipmentNo: shipmentData.shipmentNo,
			signature: 1
		};
		await handoverShipmentApi(handoverShipmentPayload).then(res => {
			console.log("");
		})
	}

	return response.loading ? (
		<Loading />
	) : (
			transitions.map(
				({ item, props, key }) =>
					item && (
						<animated.div key={key} style={props}>
							<Container>
								<div className="card-header">
									<h2 className="float-left">Deliver Shipment</h2>
								</div>
								<div className="card-body">
									{/* <label for="fullname">Traking No</label>
									<input id="fullname" type="text" name="fullName" class="form-control" placeholder="  Enter Tracking No" value="" />
									<button className="btn btn-info float-right btnbrown mt-2">Search</button> */}
									
									<Formik
											initialValues={initialValues}
											validationSchema={formSchema}
											onSubmit={(values) => {
													onSubmitForm(values);
											}}														>
											{(formik) => {
												const { errors, touched, isValid, dirty } = formik;
													return (
														<Form>
															<div className="form-row mb-3">
																<div className="col">
																	<label for="trackingNo">Traking No</label>
																	<Field
																		name="trackingNo" 
																		type="text" 
																		placeholder="Enter Tracking Number"
																		className={errors.trackingNo && touched.trackingNo ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="trackingNo" component="span" className="error" />
																</div>
															</div>
															<button className="btn btn-info float-right btnbrown mt-2">Search</button>
														</Form>
												)}}
									</Formik>
									
									<div className="clearfix"></div>
									<div className="form-row">
										<div className="col-sm-6">
											<div className="row">
												<label className="col-sm-6 col-6 redcolor">Tracking No:</label>
												<label className="col-sm-6 col-6">
													<p className=" text-left">{trackingNo}</p>
												</label>
											</div>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6 redcolor">Receiver Name:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left">{shipmentData.receiverName}</p>
											</label>
										</div>
										<div className="col-sm-12 right-align">
											<label className="col-sm-6 col-6 redcolor">Amount:</label>
											<label className="col-sm-6 col-6 text-right">Sar {
												shipmentData.orderType === "COD" ? shipmentData.billedAmount : shipmentData.deliveryCharges
											}/-</label>
										</div>
										</div>

										<Formik
											initialValues={initialValues2}
											validationSchema={formSchema2}
											onSubmit={(values) => {
													onSubmitForm2(values);
											}}														>
											{(formik) => {
												const { errors, touched, isValid, dirty } = formik;
													return (
														<Form>
															<div className="row">
																<div className="col-md-6">
																	<label for="trackingNo">Receiver OTP</label>
																	<Field
																		name="otp" 
																		type="text" 
																		placeholder="Enter OTP"
																		value={shipmentData.mobile}
																		className={errors.otp && touched.otp ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="otp" component="span" className="error" />
																</div>
																<div className="col-md-6">
																	<label for="trackingNo">Paid Amount</label>
																	<Field
																		name="codAmount" 
																		type="number" 
																		max={`${shipmentData.orderType === "COD" ? shipmentData.billedAmount : shipmentData.deliveryCharges}`}
																		placeholder="Enter Amount"
																		className={errors.codAmount && touched.codAmount ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="codAmount" component="span" className="error" />
																</div>
															</div>
															<button className="btn btn-info float-right btnbrown mt-2">Deliver</button>
														</Form>
												)}}
									</Formik>
									</div>
							</Container>
						</animated.div>
					)
			)
		);
}
