import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import StepIndicator from './StepIndicator';
import { useHistory, Redirect } from 'react-router-dom';
import { newShipment, newShipmentList, defaultData } from './state';
import { useRecoilState } from 'recoil';
import Table from './DataTable';
import Map from './Map';
import { toast } from 'react-toastify';
import { postData } from './Api';
import { has } from 'underscore';

export default function Step3(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(newShipment);
	const [list, setlist] = useRecoilState(newShipmentList);

	const { register, errors, handleSubmit, reset } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	if (Object.keys(data).length <= 8 && data.constructor === Object) {
		return <Redirect to="/shipper/newshipment/step1" />;
	}

	console.log(data);

	/* on submit function which is triggered when add to way bill button is pressed is adds the submitted data of form to the
  array of global list state, after that step3 form data is reset so that new values can be added */

	const onSubmit = (value) => {
		setlist([
			...list,
			{
				...data,
				...value,
				additionalCharges: data.additionalCharges,
				shipmentCost: data.total + Math.round((data.total / 100) * 15),
			},
		]);
		setdata({ ...data, ...defaultData });
		reset();
	};
	console.log(list);

	/* works similar to the add to way bill button the difference is the step3 form data is not reset when submitted which is basically
  cloning the value, the value is then pushed into the global state array and displayed on the table */

	const clone = (value) => {
		setlist([
			...list,
			{
				...data,
				...value,
				additionalCharges: data.additionalCharges,
				shipmentCost: data.total + Math.round((data.total / 100) * 15),
			},
		]);
	};

	/* when the finish button is clicked submitData function is executed which firstly check if the list state which contains the array of previosly submiited data
  or the global state array is empty, if its empty the length will probably be zero so first condition is fired other wise the data is passed to the api function for
  validation and posting */

	const submitData = () => {
		if (list.length === 0) {
			toast.warning('Please add data first by using add way bill or clone');
		} else {
			postData(list)
				.then((res) => {
					toast.success('order was created successfully');
					cancel();
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	};

	if (has(list[0], 'updateReady')) {
		postData(list, 'update')
			.then((res) => {
				toast.success('order was successfully updated!');
				cancel();
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	const updateData = (value) => {
		if (list.length === 0) {
			setlist([
				...list,
				{
					...data,
					...value,
					additionalCharges: data.additionalCharges,
					shipmentCost: data.total + Math.round((data.total / 100) * 15),
					updateReady: true,
				},
			]);
		} else {
			toast.warning('only one order can be updated at a time');
		}
	};

	/* this function is executed when the checkboxes are checked and when the shipment value field is changed when the option is normalPackaging and the check is true
the values are reset same goes for other checkboxes the only difference is with the last option which is the shipment value whenever the shipment value changes
this function is called because onchange listener is attached on calls this function on every change, additional charges are updated along with the total as the insurance
value is deducted from these fields this does not include the gift packaging value if its selected */

	const addCharges = (type, check) => {
		switch (type) {
			case 'normalPackaging':
				setdata({
					...data,
					normalPackaging: check,
					giftPackaging: check ? false : data.giftPackaging,
					additionalCharges: check ? 0 : data.additionalCharges,
					insurance: check ? false : data.insurance,
					total: 45,
				});
				break;

			case 'giftPackaging':
				setdata({
					...data,
					giftPackaging: check,
					normalPackaging: data.insurance ? true : false,
					additionalCharges: check
						? data.additionalCharges + 5
						: data.additionalCharges - 5,
					total: check ? data.total + 5 : data.total - 5,
				});
				break;

			case 'insurance':
				setdata({
					...data,
					insurance: check,
					normalPackaging: data.giftPackaging ? false : true,
					additionalCharges: check
						? data.additionalCharges +
						  Math.round((data.shipmentValue / 100) * 2)
						: data.additionalCharges -
						  Math.round((data.shipmentValue / 100) * 2),
					total: check
						? data.total + Math.round((data.shipmentValue / 100) * 2)
						: data.total - Math.round((data.shipmentValue / 100) * 2),
				});
				break;

			case 'shipmentValue':
				console.log(check);
				if (Number.isNaN(check) !== true) {
					setdata({
						...data,
						shipmentValue: check, // in this case check is the value
						insurance: false,
						additionalCharges: data.insurance
							? data.additionalCharges -
							  Math.round((data.shipmentValue / 100) * 2)
							: data.additionalCharges,
						total: data.insurance
							? data.total - Math.round((data.shipmentValue / 100) * 2)
							: data.total,
					});
					break;
				}
		}
	};

	const cancel = () => {
		setdata({
			shipmentValue: 10,
			normalPackaging: true,
			giftPackaging: false,
			insurance: false,
			additionalCharges: 0,
			total: 45,
			billingType: 'true',
			location: [{ latitude: '23.8859', longitude: '39.1925' }],
		});
		setlist([]);
		hist.push('/shipper/allshipments');
	};

	return (
		<>
			<StepIndicator step1={'done'} step2={'done'} step3={'current'} />
			<div className="order-step-detail">
				<div className="form-row">
					<div className="col-sm-12">
						<h2>Receiver Information</h2>
					</div>
				</div>
				<form>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="receiverName">Receiver Name</label>
							<input
								type="text"
								className="form-control"
								name="receiverName"
								id="receiverName"
								placeholder="Receiver Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.receiverName && 'Name is required *'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="receiverMobileNumber">Receiver Contact No</label>
							<input
								type="tel"
								className="form-control"
								id="receiverMobileNumber"
								name="receiverContact"
								placeholder="Receiver Contact No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{errors.receiverMobileNumber && 'Mobile no is required *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							{/* <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">map</span>
                </div>
              </div> */}
							<Map />
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-12">
							<h2>Shipment Information</h2>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="shipmentTitle">Shipment Title</label>
							<input
								type="text"
								className="form-control"
								id="shipmentTitle"
								name="shipmentTitle"
								placeholder="Shipment Title"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{errors.shipmentTitle && 'Shipment name is required *'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">Shipment Type</label>
							<select
								className="form-control"
								id="shipmentType"
								name="shipmentType"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Shipment Type</option>
								<option value="Electronics">Electronics</option>
								<option value="General Goods">General Goods</option>
								<option value="Apparel">Apparel</option>
								<option value="Others">Others</option>
							</select>
							<span style={{ color: 'red' }}>
								{errors.shipmentType && 'Shipment Type is required *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="weight">Shipment Weight</label>
							<select
								className="form-control"
								id="shipmentWeight"
								name="shipmentWeight"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Shipment Weight</option>
								<option value="Upto 5 kg">Upto 5 kg</option>
								<option value="5 kg to 10 kg"> 5 kg to 10 kg</option>
								<option value="Above 15 kg">Above 15 kg</option>
							</select>
							<span style={{ color: 'red' }}>
								{errors.shipmentWeight && 'Shipment weight is required *'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="shipmentValue">Shipment Value (SAR)</label>
							<input
								type="number"
								className="form-control"
								name="shipmentValue"
								defaultValue={data.shipmentValue}
								placeholder="Enter shipment value"
								min="1"
								onChange={(e) =>
									addCharges('shipmentValue', parseInt(e.target.value))
								}
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{errors.shipmentValue && 'Shipment value is required *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-sm-12">
							<label htmlFor="shipmentcontent">Shipment Contents</label>
							<textarea
								style={{ resize: 'none' }}
								className="form-control"
								id="content"
								name="content"
								placeholder="What does the shipment contain?"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{errors.content && 'Shipment content is required *'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="col-md-6">
							<h2>Shipper Bill</h2>
							<h3>Additional Services</h3>
							{data ? (
								<table className="table">
									<tr>
										<td className="bordertop font14" align="left">
											<input
												key={756}
												type="checkbox"
												name="normalPackaging"
												checked={data.normalPackaging}
												onClick={(e) =>
													addCharges('normalPackaging', e.target.checked)
												}
												disabled={true}
												ref={register()}
											/>
											Normal Packaging
										</td>
										<td className="bordertop font14" align="right">
											SAR 0/-
										</td>
									</tr>
									<tr>
										<td className="font14" align="left">
											<input
												key={556}
												type="checkbox"
												name="giftPackaging"
												checked={data.giftPackaging}
												onClick={(e) => {
													addCharges('giftPackaging', e.target.checked);
												}}
												ref={register()}
											/>
											Gift Packaging
										</td>
										<td className="font14" align="right">
											SAR 5/-
										</td>
									</tr>
									<tr>
										<td className="font14" align="left">
											<input
												key={65}
												type="checkbox"
												name="insurance"
												checked={data.insurance}
												onClick={(e) => {
													addCharges('insurance', e.target.checked);
												}}
												ref={register()}
											/>
											Insurance (2% of Shipment Value)
										</td>
										<td className="font14" align="right">
											SAR {Math.round((data.shipmentValue / 100) * 2)}/-
										</td>
									</tr>
								</table>
							) : null}
							<table className="table">
								<tr>
									<td className="bordertop" align="left">
										Additional Services Total:
									</td>
									<td className="bordertop" align="right">
										SAR {data.additionalCharges}/-
									</td>
								</tr>
								<tr>
									{/* after adjusting below values which are service charges and receiver address surcharge
                  add both these values and then whatever the sum is add that to the state.js file in the varibale
                  name 'total' so that the changes are reflected on the form because total represent the sum of both these
                  values */}
									<td>Services Charges:</td>
									<td align="right">SAR 35/-</td>
								</tr>
								<tr>
									<td>Receiver Address Surcharge:</td>
									<td align="right">SAR 10/-</td>
								</tr>
							</table>
							<table className="table">
								<tr>
									<td className="bordertop" align="left">
										Sub Total:
									</td>
									<td className="bordertop" align="right">
										SAR {data.additionalCharges + 35 + 10}/-
									</td>
								</tr>
								<tr>
									<td align="left">VAT: (15%)</td>
									<td align="right">
										SAR {Math.round((data.total / 100) * 15)}/-
									</td>{' '}
									{/* calculation of 15% of the total of all charges */}
								</tr>
							</table>
							<table className="table">
								<tr>
									<td className="font18" align="left">
										Total: (VAT Incusive)
									</td>
									<td className="font18" align="right">
										SAR {data.total + Math.round((data.total / 100) * 15)}/-
									</td>{' '}
									{/* this is the total including the tax of 15% */}
								</tr>
							</table>
						</div>
						<div className="col-md-6">
							<h2>Receiver Bill</h2>
							<div className="form-row">
								<div className="form-group col-md-12">
									<label htmlFor="billingType">Shipment Bill</label>
									<select
										type="text"
										className="form-control"
										name="billingType"
										placeholder="Enter COD Amount"
										onChange={(e) =>
											setdata({ ...data, billingType: e.target.value })
										}
										ref={register({
											required: true,
											validate: (value) => value !== 'true',
										})}
									>
										<option key={987} value="true">
											Select Shipment Bill (COD/Prepaid)
										</option>
										<option key={10879} value="COD">
											Cash On Delievery (COD)
										</option>
										<option key={19023} value="Prepaid">
											Prepaid
										</option>
									</select>
									<span style={{ color: 'red' }}>
										{errors.billingType && 'Billing Type is required *'}
									</span>
								</div>

								{data.billingType === 'COD' ? (
									<div className="form-group col-md-12">
										<label htmlFor="shipmentValue">
											Cash On Delivery (COD)
										</label>
										<input
											type="number"
											className="form-control"
											name="codValue"
											min="1"
											placeholder="Shipment Title"
											onChange={(e) =>
												setdata({ ...data, codValue: e.target.value })
											}
											ref={register({ min: 1, required: true })}
										/>
										<span style={{ color: 'red' }}>
											{errors?.codValue?.types?.required &&
												'COD value is required *'}
										</span>
										<span style={{ color: 'red' }}>
											{errors?.codValue?.types?.min &&
												'the minimum COD amount is SAR 1/-'}
										</span>
									</div>
								) : null}
							</div>
							{data.billingType === 'COD' ? (
								<>
									<table className="table bordernone mb-3">
										<thead>
											<tr>
												<td className="font18 bordernone redcolor" align="left">
													Cash to be collected by Receiver
												</td>
												<td
													className="font18 bordernone redcolor"
													align="right"
												>
													SAR {data.codValue}/-
												</td>
											</tr>
										</thead>
									</table>
									<div className="form-row">
										<div className="col-sm-12">
											<p>
												Note: COD does not include delivery charges and shipper
												is liable to pay all delivery and additional service
												changes
											</p>
										</div>
									</div>
								</>
							) : null}
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-sm-6">
							<div className="form-row mb-4 mt-4">
								<div>
									<label className="mr-3">
										<input type="hidden" />
									</label>
								</div>
							</div>
						</div>
						<div className="form-group col-md-6">
							<input
								type="hidden"
								className="form-control"
								id="billedAmount"
								placeholder="Billed Amount"
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-12">
							<div className="btn-container float-left">
								<button
									type="button"
									className="btn btn-danger canclebtn"
									onClick={() => cancel()}
								>
									Cancel
								</button>
							</div>
							<div className="btn-container float-right">
								{data.update ? (
									<button
										className="btn btn-success mt-3 width206 finishbtn"
										type="button"
										onClick={() => handleSubmit(updateData)()}
									>
										Update
									</button>
								) : (
									<>
										{/* <input
											className="btn btn-success"
											value="Clone"
											type="button"
											onClick={() => handleSubmit(clone)()}
										/> */}
										<input
											className="btn btn-success"
											value="Add to way bill"
											type="button"
											onClick={() => handleSubmit(onSubmit)()}
										/>

										<div className="clearfix"></div>
										<button
											className="btn btn-success mt-3 width206 finishbtn"
											type="button"
											onClick={() => submitData()}
										>
											Finish
										</button>
									</>
								)}
							</div>
							<div className="clearfix" />
						</div>
					</div>
				</form>
				<div className="clearfix"></div>
				<div className="col-sm-12 margintop30">
					<Table data={list} />
				</div>
			</div>
		</>
	);
}
