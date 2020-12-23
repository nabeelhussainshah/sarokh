import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getBillApi, recordBillPaymentApi } from '../../../Api/dealerApi';

export default function SarokhPay(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [billId, setBillId] = useState('');

	const sarokhPay = JSON.parse(localStorage.getItem('sarokhPay'));

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
		billNo: '',
		biller: '',
		paidAmount: 0,
	};

	const formSchema = Yup.object().shape({
		billNo: Yup.string().required('* Required'),
	});

	const onSubmitForm = async (values) => {
		setBillId(values.billNo);
		await getBillApi(values).then((res) => {
			console.log('Res => ', res);
		});
	};

	const recordBillPaymentHandler = async () => {
		const recordBillPayload = {
			amountPaid: sarokhPay.totalAmount,
			billNo: billId,
			paymentDate: new Date(),
			paymentMethod: 'Paid by sarokh pay',
			paymentNote: 'Cash Recieved',
			paymentType: 'COD',
			userId: 3,
			walletId: 2,
		};
		await recordBillPaymentApi(recordBillPayload).then((res) => {
			console.log('res => ', res);
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
								<h2 className="float-left">Sarokh Pay</h2>
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
												<div className="row">
													<div className="col-md-6">
														<label for="trackingNo">Bill No</label>
														<Field
															name="billNo"
															type="text"
															placeholder="Enter Bill No"
															className={
																errors.billNo && touched.billNo
																	? 'input-error form-control'
																	: 'form-control'
															}
														/>
														<ErrorMessage
															style={{ color: 'red' }}
															name="billNo"
															component="span"
															className="error"
														/>
													</div>
													<div className="col-md-6">
														<label htmlFor="email">Biller</label>
														<Field
															name="biller"
															as="select"
															className={
																errors.biller && touched.biller
																	? 'input-error form-control'
																	: 'form-control'
															}
														>
															<option value="Customer Address">Sarokh</option>
														</Field>
														<ErrorMessage
															style={{ color: 'red' }}
															name="biller"
															component="span"
															className="error"
														/>
													</div>
												</div>
												<button className="btn btn-info float-right btnbrown mt-2">
													Search
												</button>
											</Form>
										);
									}}
								</Formik>

								<div className="clearfix"></div>
								<div className="form-row">
									<div className="col-sm-6">
										<div className="row">
											<label className="col-sm-6 col-6 redcolor">
												Bill No:
											</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left">
													{sarokhPay && sarokhPay.trackingNo
														? sarokhPay.trackingNo
														: ''}
												</p>
											</label>
										</div>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6 redcolor">
											Biller Name:
										</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">
												{sarokhPay && sarokhPay.senderName
													? sarokhPay.senderName
													: ''}
											</p>
										</label>
									</div>
									<div className="col-sm-12 right-align">
										<label className="col-sm-6 col-6 redcolor">Amount:</label>
										<label className="col-sm-6 col-6 text-right">
											Sar{' '}
											{sarokhPay && sarokhPay.totalAmount
												? sarokhPay.totalAmount
												: ''}
											/-
										</label>
									</div>
									<div className="col-md-12">
										<button
											className="btn btn-info float-right btnbrown mt-2"
											onClick={recordBillPaymentHandler}
										>
											Paid
										</button>
									</div>
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
