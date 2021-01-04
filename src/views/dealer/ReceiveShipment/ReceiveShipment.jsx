import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
	verifyShipmentTrackingNoApi,
	getShipperRecieveApi,
	onConfirmShipperRecieveShipmentApi,
} from '../../../Api/dealerApi';

export default function ReceiveShipment(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [shipperId, setShipperId] = useState(0);
	const [shipperList, setShipperList] = useState([]);
	const [shipperName, setShipperName] = useState('');

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

	const formSchema = Yup.object().shape({
		trackingNo: Yup.string().required('* Required'),
	});

	const onSubmitForm = async (values) => {
		await verifyShipmentTrackingNoApi(values.trackingNo).then((res) => {
			setShipperId(res.shipperId);
			getShipperRecieveApi(res.shipperId).then((res) => {
				setShipperList([values.trackingNo]);
				setShipperName([values.trackingNo]);
			});
		});
	};

	const onCompleteClick = async () => {
		const payload = {
			dealerId: JSON.parse(localStorage.getItem('user')).id,
			driverId: 0,
			shipmentList: shipperList,
			shipperId: shipperId,
			shipperName: null,
			signature: 1,
		};
		await onConfirmShipperRecieveShipmentApi(payload).then((res) => {
			hist.push("/dealer/dashboard");
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
									<h2 className="float-left">Receive Shipment</h2>
								) : (
									<h2 className="text-right pl-2" dir="rtl">استلام الشحنة</h2>
								)}
								{localStorage.getItem('Language') != 'Arabic' ? (
									<button
										className="btn btn-info float-right btnbrown"
										onClick={onCompleteClick}
									>
										Complete
									</button>
								) : (
									<button
										className="btn btn-info float-left btnbrown"
										onClick={onCompleteClick}
									>
										تأكيد
									</button>
								)}
							</div>
							<div className="card-body">
								<Formik
									initialValues={initialValues}
									validationSchema={formSchema}
									onSubmit={(values) => {
										onSubmitForm(values);
									}}
								>
									{(formik) => {
										const { errors, touched, isValid, dirty } = formik;
										return (
											<Form>
												<div className="form-row mb-3">
													<div className="col">
														{localStorage.getItem('Language') != 'Arabic' ? (
															<label for="trackingNo">Tracking No</label>
														) : (
															<label for="trackingNo" className="text-right float-right">تتبع أي</label>
														)}

														<Field
															name="trackingNo"
															type="text"
															placeholder="Enter Tracking Number"
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
													</div>
												</div>
												{localStorage.getItem('Language') != 'Arabic' ? (
													<button className="btn btn-info float-right btnbrown mt-2">
														Receive
													</button>
												) : (
													<button className="btn btn-info float-left btnbrown mt-2">
														تسلم
													</button>
												)}
											</Form>
										);
									}}
								</Formik>
								{shipperList.map((item) => (
									<div>{item}</div>
								))}
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
