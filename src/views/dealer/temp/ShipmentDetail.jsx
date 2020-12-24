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
	createBillApi,
	deleteBillApi,
	deleteShipmentApi,
	getCityListApi,
	getShipperDeliveryChargesApi,
	createMobileShipmentApi,
	recordBillPaymentApi,
} from '../../../Api/dealerApi';

export default function DealerDashboard(props) {
	const user = JSON.parse(localStorage.getItem('user'));
	console.log('USer => ', user);

	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [secondForm, setSecondForm] = useState(0);
	const [firstFormValues, setFirstFormValues] = useState({});
	const [cities, setCities] = useState([]);
	const [shipperDeliveryCharges, setShipperDeliveryCharges] = useState({});
	const [giftPackaging, setGiftPackaging] = useState(false);
	const [insuranceCharges, setInsuranceCharges] = useState(false);
	const [normalPackaging, setNormalPackaging] = useState(false);
	const [billId, setBillId] = useState(0);
	const [shipmentId, setShipmentId] = useState(0);

	useEffect(async () => {
		await getCityListApi().then((res) => {
			res && setCities(res);
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

	const initialValues1 = {
		codAmount: 0,
		dealerId: user.dealerId,
		deliverySarokhPointId: 0,
		deliveryType: '',
		giftPackaging: true,
		insurance: true,
		locationLatitude: '',
		locationLongitude: '',
		normalPackaging: true,
		receiverAddress: '',
		receiverCity: '',
		receiverContact: '',
		receiverName: '',
		receiverType: '',
		senderAddress: '',
		senderContact: '',
		senderIdFile: '',
		senderIdNumber: '',
		senderName: '',
		shipmentContent: '',
		shipmentType: '',
		shipmentValue: 0,
		shipmentWeight: '',
	};

	const firstFormSchema = Yup.object().shape({
		senderName: Yup.string().required('* Required'),
		senderContact: Yup.string()
			.required('* Required')
			.matches(
				/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
				`Invalid! try like "966512345678"`
			),
		senderIdNumber: Yup.string()
			.required('* Required')
			.matches(
				/\b[12]\d{9}\b/,
				'Invalid, Please use correct ID Number or Iqama Number'
			),
		senderIdFile: Yup.mixed(),
		senderAddress: Yup.string().required('* Required'),
		receiverName: Yup.string().required('* Required'),
		receiverContact: Yup.string()
			.required('* Required')
			.matches(
				/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
				`Invalid! try like "966512345678"`
			),
		receiverCity: Yup.string().required('* Required'),
		shipmentType: Yup.string().required('Required'),
		shipmentWeight: Yup.string().required('Required'),
		shipmentContent: Yup.string().required('* Required'),
		shipmentValue: Yup.string().required('* Required'),
		deliveryType: Yup.string().required('Required'),
	});

	const secondFormSchema = Yup.object().shape({
		paymentMethod: Yup.string().required('Required'),
	});

	const initialValues2 = {
		totalAdditionalCharges: 0,
		deliveryCharges: 0,
		totalAmount: 0,
		paymentMethod: '',
	};

	const onSubmitFirstForm = async (values) => {
		setFirstFormValues(values);
		setSecondForm(1);
		await getShipperDeliveryChargesApi().then((res) => {
			console.log('Shipper DileveryCharges');
			console.log(res);

			setShipperDeliveryCharges(res);
		});
	};

	const onSubmitSecondForm = async (values) => {
		values.giftPackaging = giftPackaging;
		values.insurance = insuranceCharges;
		values.normalPackaging = normalPackaging;

		setFirstFormValues(values);

		let createBillPayload = {};

		await createMobileShipmentApi(values).then((res) => {
			console.log('Res => ', res);
			localStorage.setItem(
				'sarokhPay',
				JSON.stringify({
					trackingNo: res,
					senderName: values.senderName,
					totalAmount: values.totalAmount,
				})
			);
			setShipmentId(res);
			createBillPayload = {
				billCategory: 'Shipment Charges',
				billTo: 1,
				billType: 'Invoice',
				dueDate: new Date().setDate(new Date().getDate() - 1),
				endDate: new Date().setDate(new Date().getDate() + 1),
				shipmentsIdList: res,
				startDate: new Date(),
				deliveryCharges:
					values.paymentMethod !== 'COD' ? values.totalAmount : 0,
				totalAmount: values.paymentMethod === 'COD' ? values.totalAmount : 0,
				transactionType: '',
			};
		});

		await createBillApi(createBillPayload).then((res) => {
			setBillId(res.id);
		});

		setSecondForm(3);
	};

	const onPaidClick = async () => {
		const recordBillPayload = {
			amountPaid: firstFormValues.totalAmount,
			billNo: billId,
			paymentDate: new Date(),
			paymentMethod: 'COD',
			paymentNote: JSON.parse(localStorage.getItem('user')).dealerPointName,
			paymentType: firstFormValues.paymentMethod,
			userId: 3,
			walletId: 2,
		};
		await recordBillPaymentApi(recordBillPayload).then((res) => {
			console.log('res => ', res);
		});
	};

	const discardBill = async () => {
		await deleteBillApi(billId).then((res) => {
			console.log('Bill Deleted => ', res);
		});

		await deleteShipmentApi(shipmentId).then((res) => {
			console.log('Shipment Deleted => ', res);
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
							{secondForm === 0 ? (
								<>
									<div className="card-header">
										{localStorage.getItem('Language') != 'Arabic' ? (
											<h2 className="float-left">
												{' '}
												Create Shipment - Shipment Detail
											</h2>
										) : (
											<h2 className="float-left">إنشاء شحنة - تفاصيل الشحنة</h2>
										)}
									</div>
									<div className="card-body">
										<Formik
											initialValues={initialValues1}
											validationSchema={firstFormSchema}
											onSubmit={(values) => {
												onSubmitFirstForm(values);
											}}
										>
											{(formik) => {
												const { errors, touched, isValid, dirty } = formik;
												return (
													<Form>
														<div className="form-row mb-3">
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label for="fullname">Sender Name</label>
																) : (
																	<label for="fullname">اسم المرسل</label>
																)}

																<Field
																	name="senderName"
																	type="text"
																	placeholder="Enter Sender Name"
																	className={
																		errors.senderName && touched.senderName
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="senderName"
																	component="span"
																	className="error"
																/>
															</div>
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label for="email">
																		Sender Contact Number
																	</label>
																) : (
																	<label for="email">رقم اتصال المرسل</label>
																)}

																<Field
																	name="senderContact"
																	type="text"
																	placeholder="Enter Sender Number"
																	className={
																		errors.senderContact &&
																		touched.senderContact
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="senderContact"
																	component="span"
																	className="error"
																/>
															</div>
														</div>

														<div className="form-row mb-3">
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label>National ID or Iqama Number</label>
																) : (
																	<label>الرقم القومي أو رقم الإقامة</label>
																)}

																<Field
																	name="senderIdNumber"
																	type="text"
																	placeholder="Enter Iqama or National ID Number"
																	className={
																		errors.senderIdNumber &&
																		touched.senderIdNumber
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="senderIdNumber"
																	component="span"
																	className="error"
																/>
															</div>
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label htmlFor="email">
																		Upload ID or Iqama
																	</label>
																) : (
																	<label htmlFor="email">
																		تحميل الهوية أو الإقامة
																	</label>
																)}

																<Field
																	name="senderIdFile"
																	type="file"
																	placeholder="Enter Iqama or National ID Number"
																	className={
																		errors.senderIdFile && touched.senderIdFile
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="senderIdFile"
																	component="span"
																	className="error"
																/>
															</div>
														</div>
														<div className="form-row mb-3">
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label>Sender Address</label>
																) : (
																	<label>عنوان المرسل</label>
																)}

																<Field
																	name="senderAddress"
																	type="text"
																	placeholder="Enter complete Address Here"
																	className={
																		errors.senderAddress &&
																		touched.senderAddress
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="senderAddress"
																	component="span"
																	className="error"
																/>
															</div>
														</div>
														<div className="form-row mb-3">
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label>Receiver Name</label>
																) : (
																	<label>:اسم المتلقي</label>
																)}

																<Field
																	name="receiverName"
																	type="text"
																	placeholder="Enter Reciever Name"
																	className={
																		errors.receiverName && touched.receiverName
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="receiverName"
																	component="span"
																	className="error"
																/>
															</div>
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label htmlFor="email">
																		Receiver Contact
																	</label>
																) : (
																	<label htmlFor="email">
																		جهة اتصال المتلقي
																	</label>
																)}

																<Field
																	name="receiverContact"
																	type="text"
																	placeholder="Enter Reciever Contact"
																	className={
																		errors.receiverContact &&
																		touched.receiverContact
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="receiverContact"
																	component="span"
																	className="error"
																/>
															</div>
														</div>
														<div className="form-row mb-3">
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label>Receiver City</label>
																) : (
																	<label>مدينة المستقبل</label>
																)}

																<Field
																	name="receiverCity"
																	as="select"
																	className={
																		errors.receiverCity && touched.receiverCity
																			? 'input-error form-control'
																			: 'form-control'
																	}
																>
																	<option value="">
																		--- Select Reciever City ---
																	</option>
																	{cities.map((item) => (
																		<option value={item}>{item}</option>
																	))}
																</Field>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="receiverCity"
																	component="span"
																	className="error"
																/>
															</div>
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label>Shipment Type</label>
																) : (
																	<label>نوع الشحن</label>
																)}

																<Field
																	name="shipmentType"
																	as="select"
																	className={
																		errors.shipmentType && touched.shipmentType
																			? 'input-error form-control'
																			: 'form-control'
																	}
																>
																	<option value="">
																		--- Select Shipment Type ---
																	</option>
																	<option value="Electronics">
																		Electronics
																	</option>
																	<option value="General Goods">
																		General Goods
																	</option>
																	<option value="Apparel">Apparel</option>
																	<option value="Others">Others</option>
																</Field>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="shipmentType"
																	component="span"
																	className="error"
																/>
															</div>
														</div>
														<div className="form-row mb-3">
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label htmlFor="email">Shipment Weight</label>
																) : (
																	<label htmlFor="email">وزن الشحنة</label>
																)}

																<Field
																	name="shipmentWeight"
																	as="select"
																	className={
																		errors.shipmentWeight &&
																		touched.shipmentWeight
																			? 'input-error form-control'
																			: 'form-control'
																	}
																>
																	<option value="">
																		--- Select Shipment Weight ---
																	</option>
																	<option value="Upto 5 kg">Upto 5 kg</option>
																	<option value="5 kg to 10 kg">
																		5 kg to 10 kg
																	</option>
																	<option value="Above 15 kg">
																		Above 15 kg
																	</option>
																</Field>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="shipmentWeight"
																	component="span"
																	className="error"
																/>
															</div>
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label>Shipment Content</label>
																) : (
																	<label>محتوى الشحن</label>
																)}

																<Field
																	name="shipmentContent"
																	type="text"
																	placeholder="Enter Shipment Content"
																	className={
																		errors.shipmentContent &&
																		touched.shipmentContent
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="shipmentContent"
																	component="span"
																	className="error"
																/>
															</div>
														</div>
														<div className="form-row mb-3">
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label htmlFor="email">Shipment Value</label>
																) : (
																	<label htmlFor="email">قيمة الشحنة</label>
																)}

																<Field
																	name="shipmentValue"
																	type="text"
																	placeholder="Enter Shipment Value"
																	className={
																		errors.shipmentValue &&
																		touched.shipmentValue
																			? 'input-error form-control'
																			: 'form-control'
																	}
																/>
																<ErrorMessage
																	style={{ color: 'red' }}
																	name="shipmentValue"
																	component="span"
																	className="error"
																/>
															</div>
															<div className="col">
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<label htmlFor="email">Delivery Type</label>
																) : (
																	<label htmlFor="email">نوع التوصيل</label>
																)}

																<Field
																	name="deliveryType"
																	as="select"
																	className={
																		errors.deliveryType && touched.deliveryType
																			? 'input-error form-control'
																			: 'form-control'
																	}
																>
																	<option value="">
																		--- Select Delivery Type ---
																	</option>
																	<option value="Customer Address">
																		Customer Address
																	</option>
																	<option value="Sarokh point">
																		Sarokh point
																	</option>
																</Field>

																<ErrorMessage
																	style={{ color: 'red' }}
																	name="deliveryType"
																	component="span"
																	className="error"
																/>
															</div>
														</div>
														{localStorage.getItem('Language') != 'Arabic' ? (
															<button
																type="submit"
																className={
																	!(dirty && isValid)
																		? 'disabled-btn btn btn-info float-right btnbrown mt-2'
																		: 'btn btn-info float-right btnbrown mt-2'
																}
																disabled={!(dirty && isValid)}
															>
																Next
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
																التالى
															</button>
														)}
													</Form>
												);
											}}
										</Formik>
									</div>
								</>
							) : secondForm === 1 ? (
								<>
									<div className="card-header">
										{localStorage.getItem('Language') != 'Arabic' ? (
											<h2 className="float-left">
												{' '}
												Create Shipment - Shipment Detail
											</h2>
										) : (
											<h2 className="float-left">إنشاء شحنة - تفاصيل الشحنة</h2>
										)}
									</div>
									<div className="card-body">
										<Formik
											initialValues={initialValues2}
											validationSchema={secondFormSchema}
											onSubmit={(values) => {
												onSubmitSecondForm(values);
											}}
										>
											{(formik) => {
												const {
													errors,
													touched,
													isValid,
													dirty,
													values,
													setFieldValue,
												} = formik;
												return (
													<Form>
														<Field
															name="serviceCharges"
															type="hidden"
															value="0"
														/>
														<Field
															name="deliveryCharges"
															type="hidden"
															value="0"
														/>
														<Field name="totalAmount" type="hidden" value="0" />
														<div className="form-row">
															<div className="col-md-6">
																<div>
																	{localStorage.getItem('Language') !=
																	'Arabic' ? (
																		<label htmlFor="email">
																			Payment Method
																		</label>
																	) : (
																		<label htmlFor="email">
																			طريقة الدفع او السداد
																		</label>
																	)}

																	<Field
																		name="paymentMethod"
																		as="select"
																		className={
																			errors.paymentMethod &&
																			touched.paymentMethod
																				? 'input-error form-control'
																				: 'form-control'
																		}
																	>
																		<option value="Prepaid">Prepaid</option>
																		<option value="COD">COD</option>
																	</Field>
																	<ErrorMessage
																		style={{ color: 'red' }}
																		name="paymentMethod"
																		component="span"
																		className="error"
																	/>
																</div>
																<br />
																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<h5 style={{ color: '#fa1c25' }}>
																		Shipper Bill
																	</h5>
																) : (
																	<h5 style={{ color: '#fa1c25' }}>
																		الشاحن بيل
																	</h5>
																)}

																{localStorage.getItem('Language') !=
																'Arabic' ? (
																	<p>Additional Services</p>
																) : (
																	<p>خدمات إضافية</p>
																)}

																<table className="table">
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td
																				className="bordertop font14"
																				align="left"
																			>
																				<input
																					key={756}
																					type="checkbox"
																					// checked={nopackaging}
																					// onClick={(e) =>
																					// 	addCharges('noPackaging', e.target.checked)
																					// }
																				/>
																				Shipper Packaging
																			</td>
																		) : (
																			<td
																				className="bordertop font14"
																				align="left"
																			>
																				<input
																					key={756}
																					type="checkbox"
																					// checked={nopackaging}
																					// onClick={(e) =>
																					// 	addCharges('noPackaging', e.target.checked)
																					// }
																				/>
																				تغليف الشاحن
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td
																				className="bordertop font14"
																				align="right"
																			>
																				SAR {0}/-
																			</td>
																		) : (
																			<td
																				className="bordertop font14"
																				align="right"
																			>
																				صار {0}/-
																			</td>
																		)}
																	</tr>
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td
																				className="bordertop font14"
																				align="left"
																			>
																				<input
																					key={756}
																					type="checkbox"
																					name="normalPackaging"
																					checked={normalPackaging}
																					onClick={(e) =>
																						setNormalPackaging(e.target.checked)
																					}
																				/>
																				Sarokh Packaging
																			</td>
																		) : (
																			<td
																				className="bordertop font14"
																				align="left"
																			>
																				<input
																					key={756}
																					type="checkbox"
																					name="normalPackaging"
																					checked={normalPackaging}
																					onClick={(e) =>
																						setNormalPackaging(e.target.checked)
																					}
																				/>
																				صاروخ للتغليف
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td
																				className="bordertop font14"
																				align="right"
																			>
																				SAR {0}/-
																			</td>
																		) : (
																			<td
																				className="bordertop font14"
																				align="right"
																			>
																				صار {0}/-
																			</td>
																		)}
																	</tr>
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="font14" align="left">
																				<input
																					key={556}
																					type="checkbox"
																					name="giftPackaging"
																					checked={giftPackaging}
																					onClick={(e) => {
																						setGiftPackaging(e.target.checked);
																					}}
																				/>
																				Gift Packaging
																			</td>
																		) : (
																			<td className="font14" align="left">
																				<input
																					key={556}
																					type="checkbox"
																					name="giftPackaging"
																					checked={giftPackaging}
																					onClick={(e) => {
																						setGiftPackaging(e.target.checked);
																					}}
																				/>
																				تغليف الهدايا
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<h2 className="float-left">
																				{' '}
																				Create Shipment - Shipment Detail
																			</h2>
																		) : (
																			<h2 className="float-left">
																				إنشاء شحنة - تفاصيل الشحنة
																			</h2>
																		)}
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="font14" align="right">
																				SAR{' '}
																				{Object.keys(shipperDeliveryCharges)
																					.length > 0 &&
																					shipperDeliveryCharges.giftPackaging}
																				/-
																			</td>
																		) : (
																			<td
																				className="bordertop font14"
																				align="right"
																			>
																				صار{' '}
																				{Object.keys(shipperDeliveryCharges)
																					.length > 0 &&
																					shipperDeliveryCharges.giftPackaging}
																				/-
																			</td>
																		)}
																	</tr>
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="font14" align="left">
																				<input
																					key={65}
																					type="checkbox"
																					name="insurance"
																					checked={insuranceCharges}
																					onClick={(e) => {
																						setInsuranceCharges(
																							e.target.checked
																						);
																					}}
																				/>
																				Insurance (
																				{shipperDeliveryCharges.insurance} % of
																				Shipment Value)
																			</td>
																		) : (
																			<td className="font14" align="left">
																				<input
																					key={65}
																					type="checkbox"
																					name="insurance"
																					checked={insuranceCharges}
																					onClick={(e) => {
																						setInsuranceCharges(
																							e.target.checked
																						);
																					}}
																				/>
																				تأمين (
																				{shipperDeliveryCharges.insurance} ٪ من
																				قيمة الشحنة)
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="font14" align="right">
																				SAR{' '}
																				{(100 *
																					shipperDeliveryCharges.insurance) /
																					firstFormValues.shipmentValue}
																				/-
																			</td>
																		) : (
																			<td className="font14" align="right">
																				صار{' '}
																				{(100 *
																					shipperDeliveryCharges.insurance) /
																					firstFormValues.shipmentValue}
																				/-
																			</td>
																		)}
																	</tr>
																</table>
																<table className="table">
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="bordertop" align="left">
																				Additional Services Total:
																			</td>
																		) : (
																			<td className="bordertop" align="left">
																				إجمالي الخدمات الإضافية:
																			</td>
																		)}

																		<td className="bordertop" align="right">
																			{localStorage.getItem('Language') !=
																			'Arabic' ? (
																				<span>SAR</span>
																			) : (
																				<span>صار</span>
																			)}{' '}
																			{(giftPackaging
																				? parseFloat(
																						shipperDeliveryCharges.giftPackaging
																				  )
																				: parseFloat(0)) +
																				(insuranceCharges
																					? parseFloat(
																							(100 *
																								shipperDeliveryCharges.insurance) /
																								firstFormValues.shipmentValue
																					  )
																					: parseFloat(0)) +
																				parseFloat(
																					firstFormValues.shipmentValue
																				)}
																			/-
																		</td>
																	</tr>
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td>Delivery Charges:</td>
																		) : (
																			<td className="float-right">
																				:رسوم التوصيل
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td align="right">
																				SAR{' '}
																				{firstFormValues.shipmentWeight ===
																				'Upto 5 kg'
																					? shipperDeliveryCharges.weightUptoFiveKg
																					: firstFormValues.shipmentWeight ===
																					  '5 kg to 10 kg'
																					? shipperDeliveryCharges.weightFiveToTen
																					: firstFormValues.shipmentWeight ===
																					  'Above 15 kg'
																					? shipperDeliveryCharges.weightTenToFifteen
																					: 0}
																				/-
																			</td>
																		) : (
																			<td align="right">
																				صار{' '}
																				{firstFormValues.shipmentWeight ===
																				'Upto 5 kg'
																					? shipperDeliveryCharges.weightUptoFiveKg
																					: firstFormValues.shipmentWeight ===
																					  '5 kg to 10 kg'
																					? shipperDeliveryCharges.weightFiveToTen
																					: firstFormValues.shipmentWeight ===
																					  'Above 15 kg'
																					? shipperDeliveryCharges.weightTenToFifteen
																					: 0}
																				/-
																			</td>
																		)}
																	</tr>
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td>Receiver Address Surcharge:</td>
																		) : (
																			<td className="float-right">
																				:رسوم إضافية على عنوان المستلم
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td align="right">
																				SAR{' '}
																				{firstFormValues.deliveryType ===
																				'Customer Address'
																					? shipperDeliveryCharges.lastMile
																					: 0}
																				/-
																			</td>
																		) : (
																			<td align="right">
																				صار{' '}
																				{firstFormValues.deliveryType ===
																				'Customer Address'
																					? shipperDeliveryCharges.lastMile
																					: 0}
																				/-
																			</td>
																		)}
																	</tr>
																</table>
																<table className="table">
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="bordertop" align="left">
																				Sub Total:
																			</td>
																		) : (
																			<td
																				className="bordertop float-right"
																				align="right"
																			>
																				:المجموع الفرعي
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td
																				className="bordertop float-left"
																				align="left"
																			>
																				SAR
																				{parseFloat(
																					(giftPackaging
																						? parseFloat(
																								shipperDeliveryCharges.giftPackaging
																						  )
																						: parseFloat(0)) +
																						(insuranceCharges
																							? parseFloat(
																									(100 *
																										shipperDeliveryCharges.insurance) /
																										firstFormValues.shipmentValue
																							  )
																							: parseFloat(0)) +
																						parseFloat(
																							firstFormValues.shipmentValue
																						)
																				) +
																					parseFloat(
																						firstFormValues.shipmentWeight ===
																							'Upto 5 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightUptoFiveKg
																							  )
																							: firstFormValues.shipmentWeight ===
																							  '5 kg to 10 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightFiveToTen
																							  )
																							: firstFormValues.shipmentWeight ===
																							  'Above 15 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightTenToFifteen
																							  )
																							: parseFloat(0)
																					) +
																					parseFloat(
																						values.deliveryType ===
																							'Customer Address'
																							? parseFloat(
																									shipperDeliveryCharges.lastMile
																							  )
																							: parseFloat(0)
																					)}
																				/-
																			</td>
																		) : (
																			<td
																				className="bordertop float-left"
																				align="left"
																			>
																				صار
																				{parseFloat(
																					(giftPackaging
																						? parseFloat(
																								shipperDeliveryCharges.giftPackaging
																						  )
																						: parseFloat(0)) +
																						(insuranceCharges
																							? parseFloat(
																									(100 *
																										shipperDeliveryCharges.insurance) /
																										firstFormValues.shipmentValue
																							  )
																							: parseFloat(0)) +
																						parseFloat(
																							firstFormValues.shipmentValue
																						)
																				) +
																					parseFloat(
																						firstFormValues.shipmentWeight ===
																							'Upto 5 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightUptoFiveKg
																							  )
																							: firstFormValues.shipmentWeight ===
																							  '5 kg to 10 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightFiveToTen
																							  )
																							: firstFormValues.shipmentWeight ===
																							  'Above 15 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightTenToFifteen
																							  )
																							: parseFloat(0)
																					) +
																					parseFloat(
																						values.deliveryType ===
																							'Customer Address'
																							? parseFloat(
																									shipperDeliveryCharges.lastMile
																							  )
																							: parseFloat(0)
																					)}
																				/-
																			</td>
																		)}
																	</tr>
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td align="left">VAT: (15%)</td>
																		) : (
																			<td align="right">
																				ضريبة القيمة المضافة: (15٪)
																			</td>
																		)}

																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td align="right">
																				SAR
																				{(
																					(parseFloat(
																						parseFloat(
																							(giftPackaging
																								? parseFloat(
																										shipperDeliveryCharges.giftPackaging
																								  )
																								: parseFloat(0)) +
																								(insuranceCharges
																									? parseFloat(
																											(100 *
																												shipperDeliveryCharges.insurance) /
																												firstFormValues.shipmentValue
																									  )
																									: parseFloat(0)) +
																								parseFloat(
																									firstFormValues.shipmentValue
																								)
																						) +
																							parseFloat(
																								firstFormValues.shipmentWeight ===
																									'Upto 5 kg'
																									? parseFloat(
																											shipperDeliveryCharges.weightUptoFiveKg
																									  )
																									: firstFormValues.shipmentWeight ===
																									  '5 kg to 10 kg'
																									? parseFloat(
																											shipperDeliveryCharges.weightFiveToTen
																									  )
																									: firstFormValues.shipmentWeight ===
																									  'Above 15 kg'
																									? parseFloat(
																											shipperDeliveryCharges.weightTenToFifteen
																									  )
																									: parseFloat(0)
																							) +
																							parseFloat(
																								values.deliveryType ===
																									'Customer Address'
																									? parseFloat(
																											shipperDeliveryCharges.lastMile
																									  )
																									: parseFloat(0)
																							)
																					) *
																						15) /
																					100
																				).toFixed(2)}
																				/-
																			</td>
																		) : (
																			<td align="left">
																				صار
																				{(
																					(parseFloat(
																						parseFloat(
																							(giftPackaging
																								? parseFloat(
																										shipperDeliveryCharges.giftPackaging
																								  )
																								: parseFloat(0)) +
																								(insuranceCharges
																									? parseFloat(
																											(100 *
																												shipperDeliveryCharges.insurance) /
																												firstFormValues.shipmentValue
																									  )
																									: parseFloat(0)) +
																								parseFloat(
																									firstFormValues.shipmentValue
																								)
																						) +
																							parseFloat(
																								firstFormValues.shipmentWeight ===
																									'Upto 5 kg'
																									? parseFloat(
																											shipperDeliveryCharges.weightUptoFiveKg
																									  )
																									: firstFormValues.shipmentWeight ===
																									  '5 kg to 10 kg'
																									? parseFloat(
																											shipperDeliveryCharges.weightFiveToTen
																									  )
																									: firstFormValues.shipmentWeight ===
																									  'Above 15 kg'
																									? parseFloat(
																											shipperDeliveryCharges.weightTenToFifteen
																									  )
																									: parseFloat(0)
																							) +
																							parseFloat(
																								values.deliveryType ===
																									'Customer Address'
																									? parseFloat(
																											shipperDeliveryCharges.lastMile
																									  )
																									: parseFloat(0)
																							)
																					) *
																						15) /
																					100
																				).toFixed(2)}
																				/-
																			</td>
																		)}
																	</tr>
																</table>
																<table className="table">
																	<tr>
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="font18" align="left">
																				Total: (VAT Inclusive)
																			</td>
																		) : (
																			<td className="font18" align="right">
																				الإجمالي: (شاملاً ضريبة القيمة المضافة)
																			</td>
																		)}
																		{localStorage.getItem('Language') !=
																		'Arabic' ? (
																			<td className="font18" align="right">
																				SAR
																				{parseFloat(
																					parseFloat(
																						(giftPackaging
																							? parseFloat(
																									shipperDeliveryCharges.giftPackaging
																							  )
																							: parseFloat(0)) +
																							(insuranceCharges
																								? parseFloat(
																										(100 *
																											shipperDeliveryCharges.insurance) /
																											firstFormValues.shipmentValue
																								  )
																								: parseFloat(0)) +
																							parseFloat(
																								firstFormValues.shipmentValue
																							)
																					) +
																						parseFloat(
																							firstFormValues.shipmentWeight ===
																								'Upto 5 kg'
																								? parseFloat(
																										shipperDeliveryCharges.weightUptoFiveKg
																								  )
																								: firstFormValues.shipmentWeight ===
																								  '5 kg to 10 kg'
																								? parseFloat(
																										shipperDeliveryCharges.weightFiveToTen
																								  )
																								: firstFormValues.shipmentWeight ===
																								  'Above 15 kg'
																								? parseFloat(
																										shipperDeliveryCharges.weightTenToFifteen
																								  )
																								: parseFloat(0)
																						) +
																						parseFloat(
																							values.deliveryType ===
																								'Customer Address'
																								? parseFloat(
																										shipperDeliveryCharges.lastMile
																								  )
																								: parseFloat(0)
																						)
																				) +
																					parseFloat(
																						(parseFloat(
																							parseFloat(
																								(giftPackaging
																									? parseFloat(
																											shipperDeliveryCharges.giftPackaging
																									  )
																									: parseFloat(0)) +
																									(insuranceCharges
																										? parseFloat(
																												(100 *
																													shipperDeliveryCharges.insurance) /
																													firstFormValues.shipmentValue
																										  )
																										: parseFloat(0)) +
																									parseFloat(
																										firstFormValues.shipmentValue
																									)
																							) +
																								parseFloat(
																									firstFormValues.shipmentWeight ===
																										'Upto 5 kg'
																										? parseFloat(
																												shipperDeliveryCharges.weightUptoFiveKg
																										  )
																										: firstFormValues.shipmentWeight ===
																										  '5 kg to 10 kg'
																										? parseFloat(
																												shipperDeliveryCharges.weightFiveToTen
																										  )
																										: firstFormValues.shipmentWeight ===
																										  'Above 15 kg'
																										? parseFloat(
																												shipperDeliveryCharges.weightTenToFifteen
																										  )
																										: parseFloat(0)
																								) +
																								parseFloat(
																									values.deliveryType ===
																										'Customer Address'
																										? parseFloat(
																												shipperDeliveryCharges.lastMile
																										  )
																										: parseFloat(0)
																								)
																						) *
																							15) /
																							100
																					)}
																				/-
																			</td>
																		) : (
																			<td className="font18" align="left">
																				صار
																				{parseFloat(
																					parseFloat(
																						(giftPackaging
																							? parseFloat(
																									shipperDeliveryCharges.giftPackaging
																							  )
																							: parseFloat(0)) +
																							(insuranceCharges
																								? parseFloat(
																										(100 *
																											shipperDeliveryCharges.insurance) /
																											firstFormValues.shipmentValue
																								  )
																								: parseFloat(0)) +
																							parseFloat(
																								firstFormValues.shipmentValue
																							)
																					) +
																						parseFloat(
																							firstFormValues.shipmentWeight ===
																								'Upto 5 kg'
																								? parseFloat(
																										shipperDeliveryCharges.weightUptoFiveKg
																								  )
																								: firstFormValues.shipmentWeight ===
																								  '5 kg to 10 kg'
																								? parseFloat(
																										shipperDeliveryCharges.weightFiveToTen
																								  )
																								: firstFormValues.shipmentWeight ===
																								  'Above 15 kg'
																								? parseFloat(
																										shipperDeliveryCharges.weightTenToFifteen
																								  )
																								: parseFloat(0)
																						) +
																						parseFloat(
																							values.deliveryType ===
																								'Customer Address'
																								? parseFloat(
																										shipperDeliveryCharges.lastMile
																								  )
																								: parseFloat(0)
																						)
																				) +
																					parseFloat(
																						(parseFloat(
																							parseFloat(
																								(giftPackaging
																									? parseFloat(
																											shipperDeliveryCharges.giftPackaging
																									  )
																									: parseFloat(0)) +
																									(insuranceCharges
																										? parseFloat(
																												(100 *
																													shipperDeliveryCharges.insurance) /
																													firstFormValues.shipmentValue
																										  )
																										: parseFloat(0)) +
																									parseFloat(
																										firstFormValues.shipmentValue
																									)
																							) +
																								parseFloat(
																									firstFormValues.shipmentWeight ===
																										'Upto 5 kg'
																										? parseFloat(
																												shipperDeliveryCharges.weightUptoFiveKg
																										  )
																										: firstFormValues.shipmentWeight ===
																										  '5 kg to 10 kg'
																										? parseFloat(
																												shipperDeliveryCharges.weightFiveToTen
																										  )
																										: firstFormValues.shipmentWeight ===
																										  'Above 15 kg'
																										? parseFloat(
																												shipperDeliveryCharges.weightTenToFifteen
																										  )
																										: parseFloat(0)
																								) +
																								parseFloat(
																									values.deliveryType ===
																										'Customer Address'
																										? parseFloat(
																												shipperDeliveryCharges.lastMile
																										  )
																										: parseFloat(0)
																								)
																						) *
																							15) /
																							100
																					)}
																				/-
																			</td>
																		)}{' '}
																		{/* this is the total including the tax of 15% */}
																	</tr>
																</table>
															</div>
														</div>
														<button
															type="submit"
															className={
																dirty && !isValid
																	? 'disabled-btn btn btn-info float-right btnbrown mt-2'
																	: 'btn btn-info float-right btnbrown mt-2'
															}
															disabled={dirty && !isValid}
															onClick={() => {
																setFieldValue(
																	'serviceCharges',
																	(giftPackaging
																		? parseFloat(
																				shipperDeliveryCharges.giftPackaging
																		  )
																		: parseFloat(0)) +
																		(insuranceCharges
																			? parseFloat(
																					(100 *
																						shipperDeliveryCharges.insurance) /
																						firstFormValues.shipmentValue
																			  )
																			: parseFloat(0)) +
																		parseFloat(firstFormValues.shipmentValue)
																);
																setFieldValue(
																	'deliveryCharges',
																	firstFormValues.shipmentWeight === 'Upto 5 kg'
																		? shipperDeliveryCharges.weightUptoFiveKg
																		: firstFormValues.shipmentWeight ===
																		  '5 kg to 10 kg'
																		? shipperDeliveryCharges.weightFiveToTen
																		: firstFormValues.shipmentWeight ===
																		  'Above 15 kg'
																		? shipperDeliveryCharges.weightTenToFifteen
																		: 0
																);
																setFieldValue(
																	'totalAmount',
																	parseFloat(
																		parseFloat(
																			(giftPackaging
																				? parseFloat(
																						shipperDeliveryCharges.giftPackaging
																				  )
																				: parseFloat(0)) +
																				(insuranceCharges
																					? parseFloat(
																							(100 *
																								shipperDeliveryCharges.insurance) /
																								firstFormValues.shipmentValue
																					  )
																					: parseFloat(0)) +
																				parseFloat(
																					firstFormValues.shipmentValue
																				)
																		) +
																			parseFloat(
																				firstFormValues.shipmentWeight ===
																					'Upto 5 kg'
																					? parseFloat(
																							shipperDeliveryCharges.weightUptoFiveKg
																					  )
																					: firstFormValues.shipmentWeight ===
																					  '5 kg to 10 kg'
																					? parseFloat(
																							shipperDeliveryCharges.weightFiveToTen
																					  )
																					: firstFormValues.shipmentWeight ===
																					  'Above 15 kg'
																					? parseFloat(
																							shipperDeliveryCharges.weightTenToFifteen
																					  )
																					: parseFloat(0)
																			) +
																			parseFloat(
																				values.deliveryType ===
																					'Customer Address'
																					? parseFloat(
																							shipperDeliveryCharges.lastMile
																					  )
																					: parseFloat(0)
																			)
																	) +
																		parseFloat(
																			(parseFloat(
																				parseFloat(
																					(giftPackaging
																						? parseFloat(
																								shipperDeliveryCharges.giftPackaging
																						  )
																						: parseFloat(0)) +
																						(insuranceCharges
																							? parseFloat(
																									(100 *
																										shipperDeliveryCharges.insurance) /
																										firstFormValues.shipmentValue
																							  )
																							: parseFloat(0)) +
																						parseFloat(
																							firstFormValues.shipmentValue
																						)
																				) +
																					parseFloat(
																						firstFormValues.shipmentWeight ===
																							'Upto 5 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightUptoFiveKg
																							  )
																							: firstFormValues.shipmentWeight ===
																							  '5 kg to 10 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightFiveToTen
																							  )
																							: firstFormValues.shipmentWeight ===
																							  'Above 15 kg'
																							? parseFloat(
																									shipperDeliveryCharges.weightTenToFifteen
																							  )
																							: parseFloat(0)
																					) +
																					parseFloat(
																						values.deliveryType ===
																							'Customer Address'
																							? parseFloat(
																									shipperDeliveryCharges.lastMile
																							  )
																							: parseFloat(0)
																					)
																			) *
																				15) /
																				100
																		)
																);
															}}
														>
															{localStorage.getItem('Language') != 'Arabic' ? (
																<span>Next</span>
															) : (
																<span>التالى</span>
															)}
														</button>
														<button
															type="button"
															onClick={() => setSecondForm(0)}
															className={
																'btn btn-info float-right btn-danger mt-2 mr-10'
															}
														>
															{localStorage.getItem('Language') != 'Arabic' ? (
																<span>Go Back</span>
															) : (
																<span>عد</span>
															)}
														</button>
													</Form>
												);
											}}
										</Formik>
									</div>
								</>
							) : (
								<>
									<div className="card-header">
										{localStorage.getItem('Language') != 'Arabic' ? (
											<h2 className="float-left">
												{' '}
												Create Shipment - Shipment Bill
											</h2>
										) : (
											<h2 className="float-left"> إنشاء شحنة - فاتورة الشحن</h2>
										)}
									</div>
									<div className="card-body">
										<div className="form-row">
											<div className="col-sm-6">
												<div className="row">
													{localStorage.getItem('Language') != 'Arabic' ? (
														<label className="col-sm-6 col-6 redcolor">
															Bill No:
														</label>
													) : (
														<h2 className="float-left"> مشروع قانون لا:</h2>
													)}

													<label className="col-sm-6 col-6">
														<p className=" text-left">1258</p>
													</label>
												</div>
											</div>
										</div>
										<div className="form-row">
											<div className="col-sm-6">
												<div className="row">
													{localStorage.getItem('Language') != 'Arabic' ? (
														<label className="col-sm-6 col-6 redcolor">
															Tracking No:
														</label>
													) : (
														<label className="col-sm-6 col-6 redcolor">
															:تتبع أي
														</label>
													)}

													<label className="col-sm-6 col-6">
														<p className=" text-left">{shipmentId}</p>
													</label>
												</div>
											</div>
											<div className="col-sm-6">
												{localStorage.getItem('Language') != 'Arabic' ? (
													<label className="col-sm-6 col-6 redcolor">
														Sender Name:
													</label>
												) : (
													<label className="col-sm-6 col-6 redcolor">
														:اسم المرسل
													</label>
												)}

												<label className="col-sm-6 col-6">
													<p className=" text-left">
														{firstFormValues.senderName}
													</p>
												</label>
											</div>
											<div className="col-sm-12 right-align">
												{localStorage.getItem('Language') != 'Arabic' ? (
													<label className="col-sm-6 col-6 redcolor">
														Amount:
													</label>
												) : (
													<label className="col-sm-6 col-6 redcolor">
														:كمية
													</label>
												)}

												{localStorage.getItem('Language') != 'Arabic' ? (
													<label className="col-sm-6 col-6 text-right">
														Sar {firstFormValues.totalAmount}/-
													</label>
												) : (
													<label className="col-sm-6 col-6 text-right">
														صار {firstFormValues.totalAmount}/-
													</label>
												)}
											</div>
											<div className="col-md-12">
												{localStorage.getItem('Language') != 'Arabic' ? (
													<button
														className="btn btn-info float-right btnbrown mt-2"
														onClick={onPaidClick}
													>
														Paid
													</button>
												) : (
													<button
														className="btn btn-info float-right btnbrown mt-2"
														onClick={onPaidClick}
													>
														دفع
													</button>
												)}

												{localStorage.getItem('Language') != 'Arabic' ? (
													<button
														className="btn btn-info float-right btn-danger mt-2 mr-2"
														onClick={discardBill}
													>
														Discard
													</button>
												) : (
													<button
														className="btn btn-info float-right btn-danger mt-2 mr-2"
														onClick={discardBill}
													>
														تجاهل
													</button>
												)}
											</div>
										</div>
									</div>
								</>
							)}
						</Container>
					</animated.div>
				)
		)
	);
}
