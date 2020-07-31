import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Redirect, useHistory } from 'react-router-dom';
import { state } from './state';
import { useForm, get } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import Container from '../../Containers/ListingContainer';
import StepIndicator from "./StepIndicator";

export default function Step3(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(state);
	const [response, setresponse] = useState({ loading: true });
	const { register, handleSubmit, errors } = useForm({
		shouldFocusError: true,
		defaultValues: data,
		mode: "onChange",
		criteriaMode: "all"
	});
	console.log(data);

	const onSubmit = (formdata) => {
		console.log(formdata);
		setdata({ ...data, ...formdata });
		hist.push('/shipper/signup/step4');
	};

	useEffect(() => {
		async function fetchData() {
			await axios
				.get(`${process.env.REACT_APP_API}/country/get-countries-list`)
				.then((res) => {
					console.log(res);
					if (res.data.status === 200) {
						setresponse({ loading: false, countries: res.data.data });
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
		fetchData();
	}, []);

	if (Object.keys(data).length === 0 && data.constructor === Object) {
		return <Redirect to="/shipper/signup/step1" />
	}

	const getCities = async (countryCode) => {
		await axios
			.get(`${process.env.REACT_APP_API}/city/get-country-city/${countryCode}`)
			.then((res) => {
				console.log(res);
				if (res.data.status === 200) {
					setresponse({ ...response, loading: false, cities: res.data.data });
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return response.loading ? (
		<div>loading...</div>
	) : (
			<Container>
				<div className="card-header">
					<h2>Shipper Signup</h2>
				</div>
				<div className="card-body">
					<StepIndicator step1="done" step2="done" step3="current" />
					<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="address">Office/Billing Address</label>
								<input
									type="text"
									className="form-control"
									name="address"
									placeholder="Office/Billing Address"
									ref={register({ required: true })}
								/>
								{errors ?.address ?.types ?.required && (
									<p style={{ color: 'red' }}>address is required</p>
								)}
							</div>
							<div className="form-group col-md-6">
								<label>Select Country</label>
								<select
									id="selectid"
									className="form-control"
									name="country"
									onChange={(e) => getCities(e.target.value)}
									ref={register({
										required: true,
										validate: (value) => value !== '',
									})}
								>
									<option key={12345} value="">
										---Select Country---
								</option>
									{response.countries.map((doc, i) => {
										return (
											<option key={i} value={doc.code}>
												{doc.name}
											</option>
										);
									})}
								</select>
								{errors ?.country ?.types ?.required && (
									<p style={{ color: 'red' }}>country is required</p>
								)}
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label>Select City</label>
								<select
									className="form-control"
									name="city"
									ref={register({
										required: true,
										validate: (value) => value !== '',
									})}
								>
									<option key={12345} value="">
										---Select City---
								</option>
									{data.city === undefined ? null : <option value={data.city}>{data.city}</option>} //this gets the value to get populated in this field when moving between steps from the global state if this form had been filled
									{response.cities === undefined
										? null
										: response.cities.map((doc, i) => {
											return (
												<option key={i} value={doc}>
													{doc}
												</option>
											);
										})}
								</select>
								{errors ?.city ?.types ?.required && (
									<p style={{ color: 'red' }}>city is required</p>
								)}
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="postCode">Post Code</label>
								<input
									type="number"
									className="form-control"
									name="postCode"
									placeholder="Post Code"
									ref={register({ required: true })}
								/>
								{errors ?.postCode ?.types ?.required && (
									<p style={{ color: 'red' }}>post code is required</p>
								)}
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="concernedPerson">Concern Person</label>
								<input
									type="text"
									className="form-control"
									name="concernedPerson"
									placeholder="Concern Person"
									ref={register({ required: true })}
								/>
								{errors ?.concernedPerson ?.types ?.required && (
									<p style={{ color: 'red' }}>concern person is required</p>
								)}
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="concernedPersonDesignation">Designation</label>
								<input
									type="text"
									className="form-control"
									name="concernedPersonDesignation"
									placeholder="Designation"
									ref={register({ required: true })}
								/>
								{errors ?.concernedPersonDesignation ?.types ?.required && (
									<p style={{ color: 'red' }}>Designation is required</p>
								)}
							</div>
						</div>
						<div className="btn-container float-right form-row">
							<div className="col-sm-12">
								<button className="btn btn-primary dark-grey mr-1" type="button">
									Back
						</button>
								<button className="btn btn-success mr-0" type="submit">
									Next
						</button>
							</div>
						</div>
					</form>
				</div>
			</Container>
		);
}
