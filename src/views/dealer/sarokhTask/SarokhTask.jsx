import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
	getGiveShipmentDetailsApi,
	getRecieveShipmentDetailsApi,
	getSarokhTaskApi,
	recieveShipmentApi,
} from '../../../Api/dealerApi';

export default function SarokhTask(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [giveShipmentList, setGiveShipmentList] = useState([]);
	const [recieveShipmentList, setRecieveShipmentList] = useState([]);
	const [driverId, setDriverId] = useState('');
	const [driverName, setDriverName] = useState('');
	const [amountToPay, setAmountToPay] = useState('');
	//let history = useHistory();
	const Confirm = (e) => {
		hist.push('/dealer/confirmation');
	};
	console.log('User => ', JSON.parse(localStorage.getItem('user')));

	useEffect(async () => {
		await getSarokhTaskApi().then((res) => {
			res && setDriverId(res.driverId);
			localStorage.setItem('taskDetails', JSON.stringify(res));
			res && setDriverName(res.driverName);
			res && setAmountToPay(res.payCOD);
		});
		await getGiveShipmentDetailsApi().then((res) => {
			console.log('Give => ', res);
			localStorage.setItem('giveShipments', JSON.stringify(res));
			setGiveShipmentList(res);
		});
		await getRecieveShipmentDetailsApi().then((res) => {
			console.log('Recieved -> ', res);
			localStorage.setItem('recievedShipments', JSON.stringify(res));
			setRecieveShipmentList(res);
		});
	}, []);

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
		trackingNo: '',
	};

	const trackingNoSchema = Yup.object().shape({
		trackingNo: Yup.string().required('* Required'),
	});

	const onSubmitTrackingNo = async (trackingNo) => {
		await recieveShipmentApi(trackingNo).then((res) => {
			console.log('Resss =>>>>>> ', res);
		});
	};

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								{localStorage.getItem('Language') != 'Arabic' ? (
									<h2 className="float-left">Sarokh Task</h2>
								) : (
									<h2 className="float-left">مهمة صاروخ</h2>
								)}
								{localStorage.getItem('Language') != 'Arabic' ? (
									<button
										className="btn btn-info float-right btnbrown"
										onClick={Confirm}
									>
										Confirm
									</button>
								) : (
									<button
										className="btn btn-info float-right btnbrown"
										onClick={Confirm}
									>
										تأكيد
									</button>
								)}
							</div>
							<div className="card-body">
								<div className="row">
									<div className="col-md-8">
										<div className="form-row">
											<div className="col-sm-6">
												{localStorage.getItem('Language') != 'Arabic' ? (
													<label className="col-sm-6 col-6 redcolor">
														{' '}
														Driver Name:
													</label>
												) : (
													<label className="col-sm-6 col-6 redcolor">
														{' '}
														:اسم السائق
													</label>
												)}

												<label className="col-sm-6 col-6">
													<p className=" text-left">{driverName}</p>
												</label>
											</div>
											<div className="col-sm-6">
												{localStorage.getItem('Language') != 'Arabic' ? (
													<label className="col-sm-6 col-6 redcolor">
														Driver ID:
													</label>
												) : (
													<label className="col-sm-6 col-6 redcolor">
														{' '}
														:معرف السائق
													</label>
												)}

												<label className="col-sm-6 col-6">
													<p className=" text-left">{driverId}</p>
												</label>
											</div>
										</div>
										<div className="form-row">
											<div className="col-md-8 mr-auto">
												<div className="row">
													<table className="table table-bordered text-center">
														<thead>
															<tr>
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<th scope="col">Receiver Shipment:</th>
																) : (
																	<th>:شحنة المتلقي</th>
																)}
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<th scope="col">Give Shipment:</th>
																) : (
																	<th>:إعطاء الشحن</th>
																)}
															</tr>
														</thead>
														<tbody>
															<tr>
																<td className="pl-0 pr-0 loop">
																	{recieveShipmentList.length > 0 &&
																		recieveShipmentList.map((item) => (
																			<p className="border-bottom pb-2">
																				{item.trackingNo}
																			</p>
																		))}
																</td>
																<td className="pl-0 pr-0 loop">
																	{giveShipmentList.length > 0 &&
																		giveShipmentList.map((item) => (
																			<p className="border-bottom pb-2">
																				{item.trackingNo}
																			</p>
																		))}
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-4">
										<div className="sarokh-pay-detail">
											{localStorage.getItem('Language') != 'Arabic' ? (
												<h3>Amount to Pay : {amountToPay}</h3>
											) : (
												<h3>{amountToPay}:مبلغ الدفع</h3>
											)}

											<div className="col">
												<Formik
													initialValues={initialValues}
													validationSchema={trackingNoSchema}
													onSubmit={(values) => {
														onSubmitTrackingNo(values.trackingNo);
													}}
												>
													{(formik) => {
														const { errors, touched, isValid, dirty } = formik;
														return (
															<Form>
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label for="fullname">
																		Enter Traking No:
																	</label>
																) : (
																	<label for="fullname">:أدخل لا تتبع</label>
																)}

																<Field
																	name="trackingNo"
																	type="text"
																	placeholder=" Scan or Type Shipment Tracking Number"
																	className={
																		errors.trackingNo && touched.trackingNo
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="trackingNo"
																	component="span"
																	className="error"
																/>
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<button
																		type="submit"
																		className={
																			!(dirty && isValid)
																				? 'disabled-btn btn btn-info float-right btnbrown mt-2'
																				: 'btn btn-info float-right btnbrown mt-2'
																		}
																		disabled={!(dirty && isValid)}
																	>
																		Submit
																	</button>
																) : (
																	<button
																		type="submit"
																		className={
																			!(dirty && isValid)
																				? 'disabled-btn btn btn-info float-right btnbrown mt-2'
																				: 'btn btn-info float-right btnbrown mt-2'
																		}
																		disabled={!(dirty && isValid)}
																	>
																		إرسال
																	</button>
																)}
															</Form>
														);
													}}
												</Formik>
											</div>
										</div>
									</div>
									{/* <div className="col-md-3">
											<div>
												<div>Recieve Shipment List</div>
												
											</div>
										</div>
										<div className="col-md-3">
											<div>
												<div>Give Shipment List</div>
												
											</div>
										</div> */}
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
