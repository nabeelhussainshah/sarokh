import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allShippersApi, shipperSettingApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ShipperSetting(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const { register, errors, watch, handleSubmit, getValues, trigger } = useForm(
		{
			shouldFocusError: true,
			mode: 'onChange',
			criteriaMode: 'all',
		}
	);

	useEffect(() => {
		if (response.loading) {
			allShippersApi()
				.then((res) => {
					setresponse({ loading: false, data: res });
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
	}, [response.loading]);

	const onSubmit = (formData) => {
		console.log(formData);
		shipperSettingApi(formData)
			.then((res) => {
				toast.success('shipper settings submitted');
			})
			.catch((err) => {
				toast.error(err.message);
			});
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
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">Shipper Setting</h2>
							</div>
							<div className="card-body shippersetting">
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Select Shipper</label>
										<select
											name="shipperId"
											className="form-control"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true" disabled selected>
												Select Shipper
											</option>
											{response.data.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.user.fullName}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.shipperId && 'Shipper is required'}
										</span>
									</div>
									<div className="col">
										<div
											className="btn-group btn-group-toggle float-right mt-4"
											data-toggle="buttons"
										>
											<label className="btn btn-secondary active">
												<input
													type="radio"
													name="enable"
													id="option1"
													value="false"
													defaultChecked={true}
													ref={register()}
												/>{' '}
												Disable
											</label>
											<label className="btn btn-secondary">
												<input
													name="enable"
													type="radio"
													name="enable"
													value="true"
													id="option2"
													ref={register({ required: true })}
												/>{' '}
												Enable
											</label>
										</div>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col-sm-4">
										<h3>Pickup Setting</h3>
										<div className="form-check form-check-inline">
											<label className="form-check-label width138">
												Sarokh Point
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="pickupSarokhPoint"
												value="true"
												className="form-check-input"
												type="radio"
												defaultChecked={true}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="pickupSarokhPoint"
												value="false"
												className="form-check-input"
												type="radio"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width138">
												Shipper Warehouse
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="pickupSarokhWarehouse"
												value="true"
												className="form-check-input"
												type="radio"
												defaultChecked={true}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="pickupSarokhWarehouse"
												value="false"
												className="form-check-input"
												type="radio"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width138">
												Sarokh Warehouse
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="pickupShipperWarehouse"
												value="true"
												className="form-check-input"
												type="radio"
												defaultChecked={true}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="pickupShipperWarehouse"
												className="form-check-input"
												value="false"
												type="radio"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
									</div>
									<div className="col-sm-4">
										<h3>Delivery Setting</h3>
										<div className="form-check form-check-inline">
											<label className="form-check-label width125">
												Sarokh Point
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="deliverySarokhPoint"
												className="form-check-input"
												value="true"
												type="radio"
												defaultChecked={true}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="deliverySarokhPoint"
												className="form-check-input"
												value="false"
												type="radio"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width125">
												Last Mile
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="deliveryLastMile"
												className="form-check-input"
												value="true"
												type="radio"
												defaultChecked={true}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="deliveryLastMile"
												className="form-check-input"
												value="false"
												type="radio"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
										<div className="clearfix"></div>
										<div className="form-check form-check-inline">
											<label className="form-check-label width125">
												Customer Choice
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="deliveryCustomerChoice"
												className="form-check-input"
												value="true"
												type="radio"
												defaultChecked={true}
												ref={register()}
											/>
											<label className="form-check-label">Enable</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												name="deliveryCustomerChoice"
												className="form-check-input"
												value="false"
												type="radio"
												ref={register({ required: true })}
											/>
											<label className="form-check-label">Disable</label>
										</div>
									</div>
									<div className="col-sm-4">
										<h3>Notes:</h3>
										<textarea
											name="notes"
											className="form-control"
											ref={register({ required: true })}
										></textarea>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.notes && 'Notes are required'}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-12">
										<h3>Billing Setting</h3>
									</div>
								</div>
								<div className="form-row mb-3">
									<div className="col">
										<label>Up to 5 Kg</label>
										<input
											type="number"
											name="weightUptoFiveKg"
											className="form-control"
											placeholder="Enter Amount"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.weightUptoFiveKg && 'Field required'}
										</span>
									</div>
									<div className="col">
										<label>Last Mile</label>
										<input
											type="number"
											name="lastMile"
											className="form-control"
											placeholder="Enter Amount"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.lastMile && 'Last Mile is required'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Up to 10 kg</label>
										<input
											type="number"
											name="weightFiveToTen"
											className="form-control"
											placeholder="Enter Amount"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.weightFiveToTen && 'Field required'}
										</span>
									</div>
									<div className="col">
										<label>Normal Packaging</label>
										<input
											type="number"
											name="normalPackaging"
											className="form-control"
											placeholder="Enter Amount"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.normalPackaging && 'Field required'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Upto 15 kg</label>
										<input
											type="number"
											name="weightTenToFifteen"
											className="form-control"
											placeholder="Enter Amount"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.weightTenToFifteen && 'Field required'}
										</span>
									</div>
									<div className="col">
										<label>Gift Packaging</label>
										<input
											type="number"
											name="giftPackaging"
											className="form-control"
											placeholder="Enter Amount"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.giftPackaging && 'Field required'}
										</span>
									</div>
								</div>
								<div className="form-row mb-3 mt-3">
									<div className="col">
										<label>Return Shipment Charges; (Undelivered)</label>
										<input
											type="number"
											name="returnCharges"
											className="form-control"
											placeholder="Enter Amount"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.returnCharges && 'Return Charges required'}
										</span>
									</div>
									<div className="col">
										<label>Insurance Percentage</label>
										<input
											type="number"
											name="insurance"
											className="form-control"
											placeholder="Enter Percentage"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.insurance && 'Insurance is required'}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-12">
										<button type="button" className="btn btn-danger float-left">
											Discard
										</button>
										<button
											type="button"
											className="btn btn-danger float-right btnbrown"
											onClick={() => {
												handleSubmit(onSubmit)();
											}}
										>
											Save
										</button>
									</div>
								</div>
							</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
