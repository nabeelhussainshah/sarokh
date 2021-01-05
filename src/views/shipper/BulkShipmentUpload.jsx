import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Container from '../../components/Containers/ListingContainer';
import Loading from '../../components/Loading/Loading';
import { useTranslation } from 'react-i18next';

export default function BulkShipmentUpload(props) {
	const { t } = useTranslation();
	const hist = useHistory();
	const { register, errors, handleSubmit } = useForm();
	const [response, setresponse] = useState({ loading: true });
	const user = JSON.parse(localStorage.getItem('user'));
	const [data, setdata] = useState({
		pickupType: 'true',
		sarokhWarehouseId: 'true',
		shipperWarehouseId: 'true',
		deliveryLocation: '',
		customerAddress: '',
		sarokhPoint: '',
		dealerPointId: '',
		fileUploaded: false,
		fileURL: '',
		deliveryLocationShipper: '',
	});

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(`${process.env.REACT_APP_API}/city/get-list`)
				.then((res) => {
					if (res.status === 200) {
						setresponse({ ...response, city: res.data.data });
					}
				})
				.catch((err) => {
					window.alert(err.message);
				});
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (response.city) {
			async function fetchData() {
				await axios
					.get(
						`${process.env.REACT_APP_API}/order/get-pickup-delivery-locations/${user.id}`
					)
					.then((res) => {
						if (res.status === 200) {
							setresponse({ ...response, loading: false, data: res.data });
						}
					})
					.catch((err) => {
						window.alert(err.message);
					});
			}
			fetchData();
		}
	}, [response.city]);

	const onsubmit = async (formdata) => {
		let data = {
			...formdata,
			deliveryLocationRadio:
				formdata.deliveryLocation === 'To SarokhPoint'
					? 'sarokhPoint'
					: 'customerAddress',
			deliveryLocation: 'To Sarokh Point',
		};
		await axios
			.post(`${process.env.REACT_APP_API}/order/create-bulk-order`, {
				...formdata,
				orderFile: data.fileURL,
				shipperId: user.id,
			})
			.then((res) => {
				console.log(res);
				if (res.data.status === 200) {
					toast.success(res.data.message);
				} else {
					toast.error('Internal server error');
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const uploadFile = async (file) => {
		const formdata = new FormData();
		formdata.append('file', file);
		formdata.append('filename', file.name);

		await axios
			.post(`${process.env.REACT_APP_API}/upload-file`, formdata, {
				headers: {
					'Content-Type': 'multipart/form-data;',
				},
			})
			.then((res) => {
				if (res.data.status === 200) {
					console.log(res.data.data);
					setdata({ ...data, fileUploaded: true, fileURL: res.data.data });
				}
			})
			.catch((err) => {
				window.alert(err.message);
			});
	};

	return response.loading ? (
		<Loading />
	) : (
		<Container>
			<div className="card-header">
				<h2>{t('Bulk Shipment Upload')}</h2>
			</div>
			<div className="card-body">
				<form className="margintop30" onSubmit={handleSubmit(onsubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label>{t('Ship From')} </label>
							<select
								className="form-control"
								id="shipFromCity"
								name="shipFromCity"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">--- Ship From City ---</option>
								{response.city.map((doc, i) => {
									return (
										<option key={i} value={doc}>
											{doc}
										</option>
									);
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.shipFromCity && 'City is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label>{t('Ship To')}</label>
							<select
								className="form-control"
								id="shipToCity"
								name="shipToCity"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">--- Ship To City ---</option>
								{response.city.map((doc, i) => {
									return (
										<option key={i} value={doc}>
											{doc}
										</option>
									);
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.shipToCity && 'City is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="pickupType">{t('Pickup Location')}</label>
							<select
								className="form-control"
								id="pickupType"
								name="pickupType"
								defaultValue={data.pickupType}
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
								<option key={2} value="DealerPoint">
									From Sarokh Points
								</option>
								<option key={3} value="ShipperWarehouse">
									From Shipper Warehouse
								</option>
								<option key={4} value="SarokhWarehouse">
									From Sarokh Warehouse
								</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.pickupType && 'Pickup Location is required'}
							</span>
							{data.pickupType === 'SarokhWarehouse' ? (
								<div className="mt-3">
									<label htmlFor="sarokhWarehouseId">Sarokh Warehouse</label>
									<select
										className="form-control"
										id="sarokhWarehouseId"
										name="sarokhWarehouseId"
										defaultValue={data.sarokhWarehouseId}
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
							{data.pickupType === 'ShipperWarehouse' ||
							data.deliveryLocationShipper !== '' ? (
								<div className="mt-3">
									<label htmlFor="deliveryLocation`">Shipper Warehouse</label>
									<select
										className="form-control"
										id="shipperWarehouseId"
										name="shipperWarehouseId"
										defaultValue={data.shipperWarehouseId}
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
										{errors.shipperWarehouseId &&
											'Shipper Warehouse is required'}
									</span>
								</div>
							) : null}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="deliveryLocation">{t('Delivery Location')}</label>
							<select
								className="form-control"
								id="deliveryLocation"
								name="deliveryLocation"
								defaultValue={data.deliveryLocation}
								onChange={(e) => {
									if (e.target.value === 'shipperLocation') {
										setdata({
											...data,
											deliveryLocationShipper: 'ShipperWarehouse',
										});
									} else {
										setdata({ ...data, deliveryLocationShipper: '' });
									}
								}}
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option key={1} value="true">
									Delivery Location{' '}
								</option>
								<option key={2} value="To SarokhPoint">
									To Sarokh Point
								</option>
								<option key={3} value="To customerAddress">
									To Customer Address
								</option>
								<option key={3} value="shipperLocation">
									Shipper Location
								</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.deliveryLocation && 'Delivery location is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label>Shipment File</label>
							<input
								type="file"
								name="fileUpload"
								className="form-control"
								onChange={(e) => uploadFile(e.target.files[0])}
								required={true}
							/>
						</div>
						<div className="form-group col-md-6">
							<p style={{ paddingTop: 38, float: 'left' }}>
								{t('Download bulk shipment sample file')}
								<a
									href="http://app.sarokh.net/web/order_file/order.xlsx"
									download={true}
								>
									{' '}
									{t('Click here')}{' '}
								</a>
							</p>
						</div>
					</div>
					<div className="form-row">
						<div className="col-sm-12">
							<div className="btn-container float-left">
								<button
									type="submit"
									className="btn btn-danger"
									disabled={!data.fileUploaded}
								>
									Upload
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
