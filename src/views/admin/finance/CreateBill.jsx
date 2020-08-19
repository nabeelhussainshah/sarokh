import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	billListApi,
	searchShipperShipmentsApi,
	createBillApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function CreateBill(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true, tableData: [] });

	const [deliveryData, setdeliveryData] = useState([]);

	const [otherData, setotherData] = useState([]);

	const [selectedOtherData, setselectedOtherData] = useState([]);

	console.log(selectedOtherData);
	const { register, errors, watch, handleSubmit, getValues, trigger } = useForm(
		{
			shouldFocusError: true,
			mode: 'onChange',
			criteriaMode: 'all',
		}
	);

	useEffect(() => {
		billListApi()
			.then((res) => {
				setresponse({ loading: false, data: res, tableData: [] });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	const columns = [
		{
			Header: 'Tracking Number',
			accessor: 'trackingNumber',
		},
		{
			Header: 'Date',
			accessor: 'startDate',
			Cell: (row) => {
				return (
					<Fragment>
						{moment(row.row.original.startDate).format('YYYY-MM-DD')}
					</Fragment>
				);
			},
		},
		{
			Header: 'Units',
			accessor: 'units',
		},
		{
			Header: 'Amount',
			accessor: 'totalAmount',
		},
	];

	const columns_others = [
		{
			Header: 'Item',
			accessor: 'item',
		},
		{
			Header: 'Unit Price',
			accessor: 'unitPrice',
		},
		{
			Header: 'Units',
			accessor: 'units',
		},
		{
			Header: 'Amount',
			accessor: 'totalAmount',
		},
	];

	const onSubmit = (formData) => {
		if (deliveryData.length === 0 && otherData.length === 0) {
			toast.warning('Please Select a Record from the Table');
		} else {
			createBillApi({
				...formData,
				shipmentsIdList: getTrackingNumber(),
			})
				.then((res) => {
					toast.success(res);
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const getTrackingNumber = () => {
		let trackingNo = '';
		deliveryData.map((doc) => {
			console.log(doc.original.trackingNumber);
			trackingNo = trackingNo.concat(doc.original.trackingNumber, ',');
		});
		return trackingNo;
	};

	const getDetails = () => {
		const dates = getValues(['startDate', 'endDate']);
		if (dates.startDate === '' && dates.endDate === '') {
			trigger(['startDate', 'endDate']);
		} else {
			searchShipperShipmentsApi(dates)
				.then((res) => {
					if (res.length === 0) {
						toast.error('No Records Found Please Try Another Dates');
					} else {
						setresponse({ ...response, tableData: res });
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	const addRow = () => {
		const values = getValues(['item', 'unitPrice', 'units', 'totalAmount']);
		if (
			values.item === '' &&
			values.unitPrice === '' &&
			values.units === '' &&
			values.unitPrice === ''
		) {
			trigger(['item', 'unitPrice', 'units', 'totalAmount']);
		} else {
			setotherData([
				{
					item: values.item,
					unitPrice: values.unitPrice,
					units: values.units,
					totalAmount: values.totalAmount,
				},
			]);
			setdeliveryData([]);
		}
	};

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
						<Container>
							<div className="card-header">
								<h2 className="float-left">Create Bill</h2>
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="col-sm-6">
										<div className="form-check form-check-inline">
											<label className="form-check-label">
												Select Bill Type
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billType"
												className="form-check-input"
												type="radio"
												value="Invoice"
												ref={register()}
											/>
											<label className="form-check-label">Invoice</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billType"
												className="form-check-input"
												type="radio"
												value="creditNote"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Credit Note</label>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-check form-check-inline">
											<label className="form-check-label">
												Billed Category
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="shipmentCharges"
												ref={register()}
											/>
											<label className="form-check-label">
												Shipment Charges
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="cod"
												ref={register()}
											/>
											<label className="form-check-label">COD</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="compensation"
												ref={register()}
											/>
											<label className="form-check-label">Compensation</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="billCategory"
												className="form-check-input"
												type="radio"
												value="others"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Others</label>
										</div>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>User Type</label>
										<select
											name="userType"
											className="form-control"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true" disabled selected>
												Select User Type (Shipper, Dealer, Driver, Vendor) (Drop
												down)
											</option>
											<option value="Shipper">Shipper</option>
											<option value="Dealer">Dealer</option>
											<option value="Driver">Driver</option>
											<option value="Vendor">Vendor</option>
										</select>
									</div>
									<div className="col">
										<label>Bill To</label>
										<select
											name="billTo"
											className="form-control"
											ref={register()}
										>
											<option value="true" disabled selected>
												Select Bill Receiver
											</option>
											{response.data.map((doc, i) => {
												if (doc.billTo !== null) {
													return (
														<option key={i} value={doc.billTo}>
															{doc.billTo}
														</option>
													);
												}
											})}
										</select>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Bill Date</label>
										<input
											type="date"
											name="billDate"
											defaultValue={moment(new Date()).format('YYYY-MM-DD')}
											disabled={true}
											className="form-control"
											placeholder="Select Date Bill Created (Auto Fill Current Date)"
										/>
									</div>
									<div className="col">
										<label>Due Date</label>
										<input
											type="date"
											name="dueDate"
											className="form-control"
											placeholder="Select Due Date"
											ref={register({ required: true })}
										/>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Start Date</label>
										<input
											type="date"
											name="startDate"
											className="form-control"
											placeholder="Select Starting Date of Billing Period"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.startDate && 'Start Date is required'}
										</span>
									</div>
									<div className="col">
										<label>End Date</label>
										<input
											type="date"
											name="endDate"
											className="form-control"
											placeholder="Select Ending Date of Billing Period"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.endDate && 'End Date is required'}
										</span>
									</div>
								</div>
								{watch('billCategory') === 'others' ? (
									<Fragment>
										<div className="col-sm-12 creatbill">
											<h2>Others</h2>
										</div>
										<div className="form-row mb-3 mt-3">
											<div className="col">
												<label>Item</label>
												<input
													type="text"
													name="item"
													className="form-control"
													placeholder="enter item name"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.item && 'Item is required'}
												</span>
											</div>
											<div className="col">
												<label>Unit Price</label>
												<input
													type="number"
													name="unitPrice"
													className="form-control"
													placeholder="Enter unit price"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.unitPrice && 'Unit Price is required'}
												</span>
											</div>
										</div>
										<div className="form-row mb-3 mt-3">
											<div className="col">
												<label>Units</label>
												<input
													type="number"
													name="units"
													className="form-control"
													placeholder="Enter no of units"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.units && 'Units are required'}
												</span>
											</div>
											<div className="col">
												<label>Amount</label>
												<input
													type="number"
													name="totalAmount"
													className="form-control"
													placeholder="Enter the amount in SAR"
													ref={register({ required: true })}
												/>
												<span style={{ color: 'red' }}>
													{' '}
													{errors.totalAmount && 'Amount is required'}
												</span>
											</div>
										</div>
									</Fragment>
								) : null}
								<div className="form-row mb-3 mt-3">
									{watch('billCategory') !== 'others' ? (
										<div className="col-sm-12 mb-3">
											<button
												type="button"
												className="btn btn-danger float-left btnbrown"
												onClick={() => {
													getDetails();
												}}
											>
												Get Detail
											</button>
										</div>
									) : (
										<div className="col-sm-12 mb-3">
											<button
												type="button"
												className="btn btn-danger float-left btnbrown"
												onClick={() => {
													addRow();
												}}
												disabled={otherData.length === 1 ? true : false}
											>
												Add Row
											</button>
											<p className="float-right">
												Total Amount:{' '}
												<span>SAR {watch('unitPrice') * watch('units')}/-</span>
											</p>
										</div>
									)}
									<div className="col-sm-12">
										<button
											type="button"
											className="btn btn-success btngreen float-right"
											onClick={() => handleSubmit(onSubmit)()}
										>
											Generate Bill
										</button>
									</div>
								</div>

								<Table
									data={
										watch('billCategory') === 'others'
											? otherData
											: response.tableData
									}
									columns={
										watch('billCategory') === 'others'
											? columns_others
											: columns
									}
									tableclass={'table-responsive custom-table margintop30'}
									pagination={true}
									rowToggle={true}
									selectedData={
										watch('billCategory') === 'others'
											? setselectedOtherData
											: setdeliveryData
									}
									dataCheck={
										watch('billCategory') === 'others'
											? selectedOtherData
											: deliveryData
									}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
