import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allDealersApi, addPointApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { cities } from '../../../Utils/cities';
import { uploadFile } from '../../../Api/generalApi';
import { GoogleMapComponent } from '../../../components/GoogleMap/GoogleMapComponent';
import { filter, isNull } from 'underscore';

export default function AddPoint(props) {
	const hist = useHistory();

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

	const { register, errors, handleSubmit, setValue } = useForm({
		defaultValues: isNull(hist.location.state) ? {} : hist.location.state,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	useEffect(() => {
		allDealersApi()
			.then((res) => {
				if (!isNull(hist.location.state)) {
					setdata({
						location: hist.location.state.location,
						commercialRegistrationFile:
							hist.location.state.commercialRegistrationFile,
						pointPicture: hist.location.state.pointPicture,
					});
					setresponse({ loading: false, data: res });
					setValue('ownerId', hist.location.state.dealerId);
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
		};
		delete payload['location'];

		console.log(payload);
		addPointApi(payload)
			.then((res) => {
				toast.success('Point added');
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
								<h2 className="float-left">Add Point</h2>
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">select Owner</label>
										<select
											type="text"
											className="form-control"
											name="ownerId"
											placeholder="select Owner"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">---select-owner---</option>
											{response.data.map((doc, i) => {
												return (
													<option key={i} value={doc.id}>
														{doc.ownerName}
													</option>
												);
											})}
										</select>
										{errors?.dealerId && (
											<p style={{ color: 'red' }}>Select Owner required</p>
										)}
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
										{errors?.dealerPointName?.types?.required && (
											<p style={{ color: 'red' }}>Point Name is required</p>
										)}
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
											placeholder="Select Starting Date"
											ref={register({ required: true })}
										/>
										{errors?.registrationNo?.types?.required && (
											<p style={{ color: 'red' }}>
												Commercial Registration No is required
											</p>
										)}
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
										{errors?.operatorName?.types?.required && (
											<p style={{ color: 'red' }}>Operator Name is required</p>
										)}
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">Operatar Contact Number</label>
										<input
											type="text"
											className="form-control"
											name="operatorContact"
											placeholder=" Enter Contact Number"
											ref={register({ required: true })}
										/>
										{errors?.operatorContactNo?.types?.required && (
											<p style={{ color: 'red' }}>
												Operator Contact is required
											</p>
										)}
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label htmlFor="latitude">Select Location</label>
										<GoogleMapComponent
											isMarkerShown={true}
											position={data.location}
											changeFunction={setdata}
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
											autocomplete={false}
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
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="SUA">Suadi Arabia</option>
										</select>
										{errors?.country?.types?.required && (
											<p style={{ color: 'red' }}>Country is required</p>
										)}
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">City</label>
										<select
											type="text"
											className="form-control"
											name="city"
											ref={register({
												required: true,
												validate: (value) => value !== 'true',
											})}
										>
											<option value="true">---select-City---</option>
											{cities.map((doc, i) => {
												return (
													<option key={i} value={doc}>
														{doc}
													</option>
												);
											})}
										</select>
										{errors?.city && (
											<p style={{ color: 'red' }}>City is required</p>
										)}
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
										{errors?.postCode?.types?.required && (
											<p style={{ color: 'red' }}>Post Code is required</p>
										)}
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
										<label htmlFor="address">Point Username</label>
										<input
											type="text"
											className="form-control"
											name="userName"
											placeholder="Enter username"
											ref={register({ required: true })}
										/>
										{errors?.pointUsername?.types?.required && (
											<p style={{ color: 'red' }}>Username is required</p>
										)}
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
										{errors?.pointPassword?.types?.required && (
											<p style={{ color: 'red' }}>Password is required</p>
										)}
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
