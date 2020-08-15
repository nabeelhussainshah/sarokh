import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { CODShipmentsApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function RecordPayment(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

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
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select User Type (Shipper, Dealer, Driver) (Drop down)"
											/>
										</div>
										<div className="col">
											<label>User Name</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Select User"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Wallet</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Wallet Type"
											/>
										</div>
										<div className="col">
											<label>Payment Type</label>
											<input
												type="password"
												name=""
												className="form-control"
												placeholder="Select Payment Type (Invoice, Credit Note, Credit, Debit)"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Bill No (If Credit Note/Invoice)</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Bill Number (Drop Down)"
											/>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<button
												type="button"
												className="btn btn-danger float-right btnbrown"
												onClick={() => {
													props.formToggle({ form: false }); //this will hide the form
												}}
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
											<label className="col-sm-6 col-6"><p className=" text-left">[Due Date]</p></label>
										</div>
										<div className="col-sm-6">
											<label className="col-sm-6 col-6">Amount:</label>
											<label className="col-sm-6 col-6"><p className=" text-left">[Amount]</p></label>
										</div>
									</div>
									<div className="form-row mb-3">
										<div className="col">
											<label>Payment Method:</label>
											<input
												type="text"
												name=""
												className="form-control"
												placeholder="Select Payment Method (Cash, Bank Transfer, Cheque, Internal Transfer) (Drop Down)"
											/>
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
											<p className="font12">The Transection is made From Sarokh to [User Name] have ID aginst Credit Note have Bill No [Bill No] of Amount [Amount Paid] on [Payment Date]. Where Due Amount is [Due Amount] and Due Date is [Due Date].</p>
											<span className="font12">Or</span>
											<p className="font12">The Transection is made to Sarokh from [User Name] have ID aginst invoice have Bill No [Bill No] of Amount [Amount Paid] on [Payment Date]. Where Due Amount is [Due Amount] and Due Date is [Due Date].</p>
											<span className="font12">Or</span>
											<p className="font12">The Transection is made to Sarokh from [User Name] have ID aginst cod recovery of Amount [Amount Paid] on [Payment Date].</p>
										</div>
									</div>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
