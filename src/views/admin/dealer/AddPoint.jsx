import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import {
	allDealersApi,
	addPointApi,
	updatePointApi,
} from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers';
import { cities } from '../../../Utils/cities';
import { uploadFile } from '../../../Api/generalApi';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';
import { filter, isNull } from 'underscore';
import { DealerPointSchema } from '../../../formValidation/dealerPointSchemaValidation';
import Timer from 'react-datetime';
import { Controller } from 'react-hook-form';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

export default function AddPoint(props) {
	const hist = useHistory();
	console.log(hist);

	const [response, setresponse] = useState({ loading: true });
	const [data, setdata] = useState({
		location: [
			{
				label: 'Industrial Zone, Yanbu 46491, Saudi Arabia',
				latitude: '23.8968124',
				longitude: '38.3224291',
			},
		],
	});

	const { register, errors, handleSubmit, setValue, control } = useForm({
		defaultValues: isNull(hist.location.state) ? {} : hist.location.state,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(DealerPointSchema),
	});

	useEffect(() => {
		allDealersApi()
			.then((res) => {
				if (!isNull(hist.location.state)) {
					const updateData = hist.location.state;
					setdata({
						location: updateData.location,
						commercialRegistrationFile: updateData.commercialRegistrationFile,
						pointPicture: updateData.pointPicture,
					});
					setresponse({ loading: false, data: res });
					setValue('ownerId', updateData.dealerId);
				} else {
					setresponse({ loading: false, data: res });
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, []);

	const uploadContent = async (file, name) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, [name]: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const onSubmit = (formData) => {
		const owner = filter(response.data, function (doc) {
			return doc.id === parseInt(formData.ownerId);
		});

		let payload = {
			...formData,
			...data,
			owner: owner[0].ownerName,
			address: data.location[0].label,
			locationLatitude: data.location[0].latitude,
			locationLongitude: data.location[0].longitude,
			timingFriday:
				moment(formData.timingFridayStart).format('HH:mm:ss') +
				'/' +
				moment(formData.timingFridayEnd).format('HH:mm:ss'),
			timingSaturdayToFriday:
				moment(formData.timingSaturdayToFridayStart).format('HH:mm:ss') +
				'/' +
				moment(formData.timingSaturdayToFridayEnd).format('HH:mm:ss'),
		};
		delete payload['location'];

		console.log(payload);
		if (!isNull(hist.location.state)) {
			const updateData = hist.location.state;

			updatePointApi({
				...payload,
				id: updateData.id,
				userId: updateData.user.userId,
			})
				.then((res) => {
					toast.success('Point Updated!!');
					hist.push('/admin/dealer/allpoints');
				})
				.catch((err) => {
					toast.error(err.message);
				});
		} else {
			addPointApi(payload)
				.then((res) => {
					toast.success('Point Added');
					hist.push('/admin/dealer/allpoints');
				})
				.catch((err) => {
					toast.error(err.message);
				});
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
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">Add Point</h2>
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Select Owner</label>
										<select
											type="text"
											className="form-control"
											name="ownerId"
											placeholder="Select Owner"
											ref={register}
										>
											<option value="">Select Owner</option>
											{response.data.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.ownerName}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.ownerId && errors.ownerId.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Point Name</label>
										<input
											type="text"
											className="form-control"
											name="dealerPointName"
											placeholder="Enter Point Name"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.dealerPointName && errors.dealerPointName.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">
											Commercial Registration Number
										</label>
										<input
											type="text"
											className="form-control"
											name="commercialRegistrationNumber"
											placeholder="Enter Commercial Registration Number"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.commercialRegistrationNumber &&
												errors.commercialRegistrationNumber.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">
											Commercial Registration Copy:
										</label>
										<input
											type="file"
											className="form-control"
											placeholder="File Upload"
											onChange={(e) => {
												uploadContent(
													e.target.files[0],
													'commercialRegistrationFile'
												);
											}}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Operator Name</label>
										<input
											type="text"
											className="form-control"
											name="operatorName"
											placeholder="Enter Name"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.operatorName && errors.operatorName.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Operator Contact Number</label>
										<input
											type="text"
											className="form-control"
											name="operatorContact"
											defaultValue={'9665'}
											placeholder=" Enter Contact Number"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.operatorContact && errors.operatorContact.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label htmlFor="latitude">Select Location</label>
										<GoogleMapComponent
											isMarkerShown={true}
											position={data.location}
											changeFunction={setdata}
											defaultCenter={{
												lat: parseFloat(data.location[0].latitude),
												lng: parseFloat(data.location[0].longitude),
												label: data.location[0].longitude,
											}}
											draggable={true}
											globalState={data}
											autocompleted={true}
											googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
											loadingElement={<div style={{ height: `100%` }} />}
											containerElement={
												<div
													style={{
														height: `400px`,
														width: `85%`,
														margin: `0 auto`,
													}}
												/>
											}
											mapElement={<div style={{ height: `100%` }} />}
										/>
										<div className="form-row mt-2 margintop30">
											<div className="form-group col-md-6">
												<div>
													Latitude:
													<input
														className="form-control"
														type="text"
														value={data.location[0].latitude}
													/>
												</div>
											</div>
											<div className="form-group col-md-6">
												<div>
													longitude:
													<input
														className="form-control"
														type="text"
														value={data.location[0].longitude}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Country</label>
										<select
											type="text"
											className="form-control"
											name="country"
											placeholder="Country"
											ref={register}
										>
											<option value="SUA">Saudi Arabia</option>
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.country && errors.country.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">City</label>
										<select
											type="text"
											className="form-control"
											name="city"
											ref={register}
										>
											<option value="">Select City</option>
											{cities.map((doc, i) => {
												return (
													<option key={i} value={doc}>
														{doc}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.city && errors.city.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Post Code</label>
										<input
											type="text"
											className="form-control"
											name="postalCode"
											placeholder="Enter Post Code"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.postalCode && errors.postalCode.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Upload Point Picture</label>
										<input
											type="file"
											className="form-control"
											placeholder="Upload File"
											onChange={(e) => {
												uploadContent(e.target.files[0], 'pointPicture');
											}}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Point Name( Arabic )</label>
										<input
											type="text"
											className="form-control"
											name="pointNameArabic"
											placeholder="Enter point Name in Arabic"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.pointNameArabic && errors.pointNameArabic.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Point Zone</label>
										<input
											type="text"
											className="form-control"
											name="pointZone"
											placeholder="Enter Point Zone"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.pointZone && errors.pointZone.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Shop Type</label>
										<select
											type="text"
											className="form-control"
											name="shopType"
											placeholder="Country"
											ref={register}
										>
											<option value="Mini Market">Mini Market</option>
											<option value="Cafe">Cafe</option>
											<option value="Supermarket">Supermarket</option>
											<option value="Mobile Store">Mobile Store</option>
											<option value="Electronics Store">
												Electronics Store
											</option>
											<option value="Flower Store">Flower Store</option>
											<option value="Event Supplies Store">
												Event Supplies Store
											</option>
											<option value="Tobacco Shop">Tobacco Shop</option>
											<option value="Restaurant">Restaurant</option>
											<option value="Diet Center">Diet Center</option>
											<option value="Hair Saloon">Hair Saloon</option>
											<option value="Dry Fruit & Nuts Shop">
												Dry Fruit & Nuts Shop
											</option>
											<option value="Tailor">Tailor</option>
											<option value="Hardware Shop">Hardware Shop</option>
											<option value="Car Detail Shop">Car Detail Shop</option>
											<option value="General Store">General Store</option>
											<option value="Fruit & Vegetables Store">
												Fruit & Vegetables Store
											</option>
											<option value="Others">Others</option>
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.shopType && errors.shopType.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Timing Friday( Start )</label>
										<Controller
											name="timingFridayStart"
											control={control}
											render={(props) => {
												return (
													<Timer
														initialViewMode={'time'}
														dateFormat={false}
														value={props.value}
														onChange={props.onChange}
													/>
												);
											}}
											defaultValue={new Date()}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.timingFridayStart &&
												errors.timingFridayStart.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Timing Friday( End )</label>
										<Controller
											name="timingFridayEnd"
											control={control}
											render={(props) => {
												return (
													<Timer
														initialViewMode={'time'}
														dateFormat={false}
														value={props.value}
														onChange={props.onChange}
													/>
												);
											}}
											defaultValue={new Date()}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.timingFridayEnd && errors.timingFridayEnd.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">
											Timing saturday to Friday( Start )
										</label>
										<Controller
											name="timingSaturdayToFridayStart"
											control={control}
											render={(props) => {
												return (
													<Timer
														initialViewMode={'time'}
														dateFormat={false}
														value={props.value}
														onChange={props.onChange}
													/>
												);
											}}
											defaultValue={new Date()}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.timingSaturdayToFridayStart &&
												errors.timingSaturdayToFridayStart.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">
											Timing saturday to Friday( End )
										</label>
										<Controller
											name="timingSaturdayToFridayEnd"
											control={control}
											render={(props) => {
												return (
													<Timer
														initialViewMode={'time'}
														dateFormat={false}
														value={props.value}
														onChange={props.onChange}
													/>
												);
											}}
											defaultValue={new Date()}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.timingSaturdayToFridayEnd &&
												errors.timingSaturdayToFridayEnd.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">Point Username</label>
										<input
											type="text"
											className="form-control"
											name="userName"
											placeholder="Enter username"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.userName && errors.userName.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Password</label>
										<input
											type="password"
											className="form-control"
											name="password"
											placeholder="Enter password"
											ref={register({ required: true })}
										/>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.password && errors.password.message}
										</span>
									</div>
								</div>
								<div className="Eform-row mb-3">
									<div className="col-sm-12">
										<button
											type="button"
											className="btn btn-danger flaot-left"
											onClick={() => {
												hist.go();
											}}
										>
											Cancel
										</button>
										<button
											type="button"
											className="btn btn-danger float-right btnbrown"
											onClick={() => {
												handleSubmit(onSubmit)();
											}}
											disabled={
												data.pointPicture && data.commercialRegistrationFile
													? false
													: true
											}
										>
											Submit
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
