import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	getUserWalletsApi,
	getUserBillsApi,
	getBillToDetailApi,
	recordBillPaymentApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment, { HTML5_FMT } from 'moment';
import { useForm } from 'react-hook-form';

export default function RecordPayment(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({
		loading: false,
		users: [{}],
		wallets: [{ id: '' }],
		bills: [{ id: '' }],
		userType: '',
		dueDate: '',
		amount: '',
	});
	console.log(response);

	const { register, errors, watch, handleSubmit, reset } = useForm({
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

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

	const getWalletAndBill = async (id) => {
		/* this function get the wallet and bills of the selected user */

		try {
			const data = { userId: id, userType: response.userType };
			const wallets = await getUserWalletsApi(data);
			const bills = await getUserBillsApi(data);
			reset({
				walletId: 'true',
				billNo: 'true',
				paymentNote: '',
				paymentMethod: 'true',
				paymentType: 'true',
			}); // reset function clears out the previous selected values in the field

			if (wallets.length !== 0 && bills.length !== 0) {
				setresponse({ ...response, wallets: wallets, bills: bills });
			} else {
				toast.error('No Bills Found For This User');
				setresponse({
					...response,
					wallets: [{ id: '' }],
					bills: [{ id: '' }],
				});
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	const getUsers = (userType) => {
		/* this function calls the api to get users list of the selected userType */

		getBillToDetailApi(userType)
			.then((res) => {
				reset({ userId: 'true' });
				setresponse({ ...response, users: res, userType: userType });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const selectedBillDetails = () => {
		/* this function is used to populated duedate , amount and the input field with name amountPaid */

		const bill = watch('billNo');
		console.log(bill);
		response.bills.map((doc) => {
			if (bill === doc.id.toString()) {
				setresponse({
					...response,
					dueDate: moment(doc.dueDate).format('YYYY-MM-DD'),
					amount: doc.totalAmount,
				});
				reset({ paymentNote: '', paymentMethod: 'true' });
			}
		});
	};

	const onsubmit = (formData) => {
		recordBillPaymentApi(formData)
			.then((res) => {
				toast.success('Data Submitted Successfully');
				setTimeout(() => {
					hist.go();
				}, 3000);
			})
			.catch((err) => {
				toast.error(err.message);
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
									<h2 className="float-left">Record Payment</h2>
								</div>
								<div className="card-body">
									<div className="form-row mb-3">
										<div className="col">
											<label>User Type</label>
											<select
												className="form-control"
												onChange={(e) => {
													if (e.target.value !== 'true') {
														getUsers(e.target.value);
													}
												}}
											>
												<option value="true">Select User Type</option>
												<option value="Shipper">Shipper</option>
												<option value="Dealer">Dealer</option>
												<option value="Driver">Driver</option>
											</select>
										</div>
										<div className="col">
											<label>User Name</label>
											<select
												name="userId"
												className="form-control"
												onChange={(e) => {
													getWalletAndBill(e.target.value);
												}}
												ref={register({ required: true })}
											>
												<option value="true">Select User</option>
												{response.users.map((doc, i) => {
													return (
														<option key={i} value={doc.id}>
															{doc.name}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Wallet</label>
											<select
												className="form-control"
												name="walletId"
												ref={register({
													required: true,
													validate: (value) => value !== 'true',
												})}
											>
												<option value="true">Select wallet</option>
												{response.wallets.map((doc, i) => {
													return (
														<option key={doc.id} value={doc.walletId}>
															{doc.walletType}
														</option>
													);
												})}
											</select>
										</div>
										<div className="col">
											<label>Payment Type</label>
											<select
												className="form-control"
												name="paymentType"
												ref={register({
													required: true,
													validate: (value) => value !== 'true',
												})}
											>
												<option value="true">Select Payment Type</option>
												<option value="Invoice">Invoice</option>
												<option value="CreditNote">CreditNote</option>
												<option value="Credit">Credit</option>
												<option value="Debit">Debit</option>
											</select>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Bill No (If Credit Note/Invoice)</label>
											<select
												className="form-control"
												name="billNo"
												ref={register({
													required: true,
													validate: (value) => value !== 'true',
												})}
											>
												) <option value="true">Select Bill No</option>
												{response.bills.map((doc, i) => {
													return (
														<option key={i} value={doc.id}>
															{doc.id}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<button
												type="button"
												className="btn btn-danger float-right btnbrown"
												onClick={() => {
													selectedBillDetails();
												}}
											>
												Get Details
										</button>
										</div>
									</div>

									<div className="form-row mb-3 creatbill">
										<div className="col-sm-12">
											<h2>Bill Information</h2>
										</div>
									</div>
									<div className="form-row billdetail mb-3">
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Due Date:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left">{response.dueDate}</p>
											</label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Amount:</label>
											<label className="col-sm-6 col-6">
												<p className=" text-left">{response.amount}</p>
											</label>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Payment Method</label>
											<select
												className="form-control"
												name="paymentMethod"
												ref={register({
													required: true,
													validate: (value) => value !== 'true',
												})}
											>
												<option value="true">Select Payment Method</option>
												<option value="Cash">Cash</option>
												<option value="BankTransfer">BankTransfer</option>
												<option value="Cheque">Cheque</option>
												<option value="InternalTransfer">InternalTransfer</option>
											</select>
										</div>
										<div className="col">
											<label>Payment Note:</label>
											<input
												type="text"
												name="paymentNote"
												className="form-control"
												placeholder="Select Bill Receiver"
												ref={register({ required: true })}
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Amount Paid:</label>
											<input
												type="number"
												name="amountPaid"
												className="form-control"
												placeholder="Enter Paid Amount (Auto Fill Billed Amount/COD)"
												defaultValue={response.amount}
												ref={register({ required: true })}
											/>
										</div>
										<div className="col">
											<label>Payment Date:</label>
											<input
												type="date"
												name="paymentDate"
												className="form-control"
												placeholder="Select Payment Date"
												defaultValue={moment(new Date()).format('YYYY-MM-DD')}
												ref={register({ required: true })}
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<button
												type="button"
												className="btn btn-danger float-right btnbrown"
												onClick={() => {
													handleSubmit(onsubmit)();
												}}
											>
												Submit
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
