import React, { useState, useEffect } from 'react';
import StepIndicator from './StepIndicator';
import { useHistory, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { newShipment, newShipmentList } from './state';
import axios from 'axios';

export default function Step2(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));
	const [data, setdata] = useRecoilState(newShipment);
	const setState = useSetRecoilState(newShipmentList);

	console.log(data);

	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	const onsubmit = (formData) => {
		console.log(formData);
		setdata({ ...data, ...formData });
		hist.push('/shipper/newshipment/step3');
	};

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(
					`${process.env.REACT_APP_API}/order/get-pickup-delivery-locations/${user.id}`
				)
				.then((response) => {
					if (response.status === 200) {
						setresponse({ loading: false, data: response.data });
					}
				})
				.catch((err) => {
					window.alert(err.message);
				});
		}
		fetchData();
	}, []);

	if (Object.keys(data).length <= 8 && data.constructor === Object) {
		// this is to check if the values exist from step1 if they dont page will be redirected to step 1 the default values have the length of 8
		return <Redirect to="/shipper/newshipment/step1" />;
	}

	if (data.deliveryLocationRadio && data.deliveryLocation) {
		// this first check is to check if the values exist becasue these values wont exist when user comes from step1 to step2 in newly created form but will exist in editing existing record
		if (
			data.deliveryLocationRadio === 'sarokhPoint' &&
			data.location[0].latitude !== '23.8859' && // co-ordinates are checked if the co-oridinates are not as in this condition this means they are not default and need to be changed
			data.location[0].longitude !== '39.1925'
		) {
			setdata({
				...data,
				location: [{ latitude: '23.8859', longitude: '39.1925' }],
			}); //this check is in case the user edits the data from the table in step3 and chooses to select a sarokh point instead of customer address then we need to set the location to default instead of previous value inserted because map is only showen when the customeraddress is selected
		}
	}

	const goback = () => {
		hist.push({
			pathname: '/shipper/newshipment/step1',
		});
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
		setState([]);
		hist.push('/shipper/allshipments');
	};

	return response.loading ? (
		<div>Loading...</div>
	) : (
		<>
			<StepIndicator step1={'done'} step2={'current'} />
			<form className="margintop30" onSubmit={handleSubmit(onsubmit)}>
				<div className="form-row">
					<div className="form-group col-md-6">
						<label htmlFor="pickupType">Pickup Location</label>
						<select
							className="form-control"
							id="pickupType"
							name="pickupType"
							onChange={(e) => {
								setdata({ ...data, pickupType: e.target.value });
							}}
							ref={register({
								required: true,
								validate: (value) => value !== 'true',
							})}
						>
							<option key={1} value="true">
								Pickup Location
							</option>
							<option key={2} value="Sarokh Point">
								From Sarokh Points
							</option>
							<option key={3} value="Shipper Warehouse">
								From Shipper Warehouse
							</option>
							<option key={4} value="Sarokh Warehouse">
								From Sarokh Warehouse
							</option>
						</select>
						<span style={{ color: 'red' }}>
							{' '}
							{errors.pickupType && 'Pickup Location is required'}
						</span>
						{data.pickupType === 'Sarokh Warehouse' ? (
							<div className="mt-3">
								<label htmlFor="sarokhWarehouseId">Sarokh Warehouse</label>
								<select
									className="form-control"
									id="sarokhWarehouseId"
									name="sarokhWarehouseId"
									onChange={(e) => {
										setdata({ ...data, sarokhWarehouseId: e.target.value });
									}}
									ref={register({
										required: true,
										validate: (value) => value !== 'true',
									})}
								>
									<option key={12345} value="true">
										--- Select Sarokh Warehouse ---
									</option>
									{response.data.sarokhWarehouses.map((doc, i) => {
										return (
											<option key={i} value={doc.id}>
												{doc.name}
											</option>
										);
									})}
								</select>
								<span style={{ color: 'red' }}>
									{' '}
									{errors.sarokhWarehouseId && 'sarokh warehouse is required'}
								</span>
							</div>
						) : null}
						{data.pickupType === 'Shipper Warehouse' ? (
							<div className="mt-3">
								<label htmlFor="shipperWarehouseId">Shipper Warehouse</label>
								<select
									className="form-control"
									id="shipperWarehouseId"
									name="shipperWarehouseId"
									onChange={(e) => {
										setdata({ ...data, shipperWarehouseId: e.target.value });
									}}
									ref={register({
										required: true,
										validate: (value) => value !== 'true',
									})}
								>
									<option key={12345} value="true">
										--- Select Shipper Warehouse ---
									</option>
									{response.data.shipperWarehouses.map((doc, i) => {
										return (
											<option key={i} value={doc.id}>
												{doc.name}
											</option>
										);
									})}
								</select>
								<span style={{ color: 'red' }}>
									{' '}
									{errors.shipperWarehouseId && 'Shipper Warehouse is required'}
								</span>
							</div>
						) : null}
					</div>
					<div className="form-group col-md-6">
						<label htmlFor="deliveryLocation">Delivery Location</label>
						<select
							className="form-control"
							id="deliveryLocation"
							name="deliveryLocation"
							defaultValue={data.deliveryLocation}
							onChange={(e) => {
								setdata({ ...data, deliveryLocation: e.target.value });
							}}
							ref={register({
								required: true,
								validate: (value) => value !== 'true',
							})}
						>
							<option key={1} value="true">
								Delivery Location{' '}
							</option>
							<option key={2} value="To Sarokh Point">
								Select Delivery Location Now
							</option>
							<option key={3} value="To Predefined Location">
								Let the Receiver Choose
							</option>
						</select>
						<span style={{ color: 'red' }}>
							{' '}
							{errors.deliveryLocation && 'Delivery location is required'}
						</span>
						{data.deliveryLocation === 'To Sarokh Point' ? (
							<div className="mt-3">
								<label name="deliveryLocationRadio">
									Choose the type of delivery location
								</label>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="deliveryLocationRadio"
										value="customerAddress"
										onClick={(e) => {
											setdata({
												...data,
												deliveryLocationRadio: 'customerAddress',
											});
										}}
										ref={register()}
									/>
									<span style={{ color: 'red' }}>
										{' '}
										{errors.deliveryLocationRadio && 'this is required'}
									</span>
									<label className="form-check-label" htmlFor="indeliverycase">
										Customer's Address
									</label>
								</div>
								<div className="form-check">
									<input
										className="form-check-input"
										type="radio"
										name="deliveryLocationRadio"
										value="sarokhPoint"
										onClick={(e) => {
											setdata({
												...data,
												deliveryLocationRadio: 'sarokhPoint',
											});
										}}
										ref={register({ required: true })}
									/>
									<span style={{ color: 'red' }}>
										{' '}
										{errors.deliveryLocationRadio && 'This field is required'}
									</span>
									<label className="form-check-label" htmlFor="selectNow">
										Sarokh Point
									</label>
								</div>
							</div>
						) : null}
						{data.deliveryLocationRadio === 'sarokhPoint' &&
						data.deliveryLocation === 'To Sarokh Point' ? (
							<div className="mt-3">
								<label htmlFor="concernPerson">Sarokh Point</label>
								<select
									className="form-control"
									name="dealerPointId"
									onChange={(e) => {
										setdata({ ...data, dealerPointId: e.target.value });
									}}
									ref={register({
										required: true,
										validate: (value) => value !== 'true',
									})}
								>
									<option key={12345} value="true">
										--- Select Sarokh Point ---
									</option>
									{response.data.sarokhPoints.map((doc, i) => {
										return (
											<option key={i} value={doc.id}>
												{doc.dealerPointName}
											</option>
										);
									})}
								</select>
								<span style={{ color: 'red' }}>
									{' '}
									{errors.dealerPointId && 'Sarokh Point is required'}
								</span>
							</div>
						) : null}
					</div>
				</div>
				<div className="form-row">
					<div className="col-sm-12">
						<div className="btn-container float-left">
							<button
								type="button"
								className="btn btn-danger"
								onClick={() => {
									cancel();
								}}
							>
								Cancel
							</button>
						</div>
						<div className="btn-container float-right">
							<button
								className="btn btn-secondary dark-grey"
								onClick={() => {
									goback();
								}}
							>
								Go to previous step
							</button>
							&nbsp;&nbsp;
							<button className="btn btn-success" type="submit">
								Next step
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
