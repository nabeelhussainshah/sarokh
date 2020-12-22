import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { verifyShipmentTrackingNoApi, getShipperRecieveApi, onConfirmShipperRecieveShipmentApi } from '../../../Api/dealerApi';

export default function ReceiveShipment(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [shipperId, setShipperId] = useState(0);
	const [shipperList, setShipperList] = useState([]);
	const [shipperName, setShipperName] = useState("");

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

	const onSubmitForm = async (values) => {
		await verifyShipmentTrackingNoApi(values.trackingNo).then(res => {
			getShipperRecieveApi(res.shipperId).then(res => {
				setShipperList(res.shipmentList);
				setShipperName(res.shipperName);
			})
		});
	}

	const onCompleteClick = async () => {
		const payload = {
			dealerId: JSON.parse(localStorage.getItem("user")).id,
			driverId: null,
			shipmentList: shipperList,
			shipperId: 1,
			shipperName: shipperName,
			signature: 1
		  }
		await onConfirmShipperRecieveShipmentApi(payload).then(res => {
			console.log("Res => ", res);
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
									<h2 className="float-left">Receive Shipment</h2>
									<button className="btn btn-info float-right btnbrown" onClick={onCompleteClick}>Complete</button>
								</div>
								<div className="card-body">
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
															<button className="btn btn-info float-right btnbrown mt-2">Receive</button>
														</Form>
												)}}
										</Formik>
										{ shipperList.map(item => (
											<div>
												{item}
											</div>
										))}
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
