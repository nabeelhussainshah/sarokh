import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	getUserWalletsApi,
	getUserBillsApi,
	getBillToDetailApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function RecordPayment(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({
		loading: false,
		users: [{}],
		wallets: [{}],
		bills: [{}],
		search: false,
		id: 1,
		userType: '',
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
		try {
			const wallets = await getUserWalletsApi(id);
			const bills = await getUserBillsApi(id);
			if (wallets.length !== 0 && bills.length !== 0) {
				setresponse({ ...response, wallets: wallets, bills: bills });
			} else {
				toast.error('No Bills Found For This User');
			}
		} catch (err) {
			toast.error(err.message);
		}
	};

	const getUsers = (userType) => {
		getBillToDetailApi(userType)
			.then((res) => {
				setresponse({ ...response, users: res });
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
						{console.log(item)}
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
											<option value="true">---select-userType---</option>
											<option value="Shipper">Shipper</option>
											<option value="Dealer">Dealer</option>
											<option value="Driver">Driver</option>
										</select>
									</div>
									<div className="col">
										<label>User Name</label>
										<select
											className="form-control"
											onChange={(e) => {
												getWalletAndBill(e.target.value);
											}}
										>
											<option value="true">---select-user---</option>
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
										<select className="form-control">
											<option value="true">---Select-wallet---</option>
											{response.wallets.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.name}
													</option>
												);
											})}
										</select>
									</div>
									<div className="col">
										<label>Payment Type</label>
										<select className="form-control">
											<option value="true">---select-Payment Type---</option>
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
										<select className="form-control">
											<option value="true">---Select-Bill No---</option>
											{response.bills.map((doc, i) => {
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
										<button
											type="button"
											className="btn btn-danger float-right btnbrown"
										>
											Get Detail
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
											<p className=" text-left">[Due Date]</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Amount:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">[Amount]</p>
										</label>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Payment Method:</label>
										<select className="form-control">
											<option value="true">---select Payment Method---</option>
											<option value="Cash">Cash</option>
											<option value="BankTransfer">BankTransfer</option>
											<option value="Cheque">Cheque</option>
											<option value="InternalTransfer">InternalTransfer</option>
										</select>
									</div>
									<div className="col">
										<label>Payment Note:</label>
										<input
											type="password"
											name=""
											className="form-control"
											placeholder="Select Bill Receiver"
										/>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Amount Paid:</label>
										<input
											type="text"
											name=""
											className="form-control"
											placeholder="Enter Paid Amount (Auto Fill Billed Amount/COD)"
										/>
									</div>
									<div className="col">
										<label>Payment Date:</label>
										<input
											type="password"
											name=""
											className="form-control"
											placeholder="Select Payment Date"
										/>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col-sm-12">
										<p className="font12">
											The Transection is made From Sarokh to [User Name] have ID
											aginst Credit Note have Bill No [Bill No] of Amount
											[Amount Paid] on [Payment Date]. Where Due Amount is [Due
											Amount] and Due Date is [Due Date].
										</p>
										<span className="font12">Or</span>
										<p className="font12">
											The Transection is made to Sarokh from [User Name] have ID
											aginst invoice have Bill No [Bill No] of Amount [Amount
											Paid] on [Payment Date]. Where Due Amount is [Due Amount]
											and Due Date is [Due Date].
										</p>
										<span className="font12">Or</span>
										<p className="font12">
											The Transection is made to Sarokh from [User Name] have ID
											aginst cod recovery of Amount [Amount Paid] on [Payment
											Date].
										</p>
									</div>
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
