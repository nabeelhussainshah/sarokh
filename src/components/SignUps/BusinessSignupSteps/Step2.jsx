import React from 'react';
import { useRecoilState } from 'recoil';
import { Redirect, useHistory } from 'react-router-dom';
import { state } from './state';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';

export default function Step2(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(state);
	const { register, handleSubmit, errors } = useForm({
		shouldFocusError: true,
		defaultValues: data,
		mode: 'onChange',
		criteriaMode: 'all',
	});
	console.log(data);

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata });
		hist.push('/business/signup/step3');
	};

	if (Object.keys(data).length === 0 && data.constructor === Object) {
		return <Redirect to="/business/signup/step1" />;
	}

	return (
		<Container>
			<div className="card-header">
				<h2>Business Signup</h2>
			</div>
			<div className="card-body">
				<StepIndicator step1="done" step2="current" />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="businessName">Business Name</label>
							<input
								name="businessName"
								type="text"
								className="form-control"
								placeholder="Business Name"
								ref={register({ required: true })}
							/>
							{errors?.businessName?.types?.required && (
								<p style={{ color: 'red' }}>first Name is required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="bankName">Bank Name</label>
							<select
								className="form-control"
								name="bankName"
								ref={register({
									required: true,
									validate: (value) => value !== '',
								})}
							>
								<option value="">Select Bank Name</option>
								<option value="The National Commercial Bank">
									The National Commercial Bank{' '}
								</option>
								<option value="The Saudi British Bank">
									The Saudi British Bank{' '}
								</option>
								<option value="Saudi Investment Bank">
									Saudi Investment Bank{' '}
								</option>
								<option value="Alinma Bank">Alinma Bank </option>
								<option value="Banque Saudi Fransi">
									{' '}
									Banque Saudi Fransi{' '}
								</option>
								<option value="Riyad Bank"> Riyad Bank </option>
								<option value="Samba Financial Group (Samba)">
									{' '}
									Samba Financial Group (Samba){' '}
								</option>
								<option value="Alawwal Bank"> Alawwal Bank </option>
								<option value="Al Rajhi Bank"> Al Rajhi Bank </option>
								<option value="Arab National Bank"> Arab National Bank </option>
								<option value="Bank AlBilad"> Bank AlBilad </option>
								<option value="Bank AlJazira"> Bank AlJazira </option>
								<option value="Gulf International Bank Saudi Aribia (GIB-SA)">
									{' '}
									Gulf International Bank Saudi Aribia (GIB-SA){' '}
								</option>
							</select>
							{errors?.bankName?.types?.required && (
								<p style={{ color: 'red' }}>Bank Name is required</p>
							)}
						</div>
						{/* <div className="form-group col-md-6">
							<label htmlFor="iqamaNumber">ID license</label>
							<input
								name="iqamaNumber"
								type="text"
								className="form-control"
								placeholder="Iqama No"
								ref={register({ required: true })}
							/>
							{errors ?.iqamaNumber ?.types ?.required && (
								<p style={{ color: 'red' }}>Business Name is required</p>
							)}
						</div> */}
					</div>
					{/* <div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="bankName">Bank Name</label>
							<select
								className="form-control"
								name="bankName"
								ref={register({ required: true, validate: value => value !== "" })}
							>
								<option value="">Select Bank Name</option>
								<option value="The National Commercial Bank">
									The National Commercial Bank{' '}
								</option>
								<option value="The Saudi British Bank">
									The Saudi British Bank{' '}
								</option>
								<option value="Saudi Investment Bank">
									Saudi Investment Bank{' '}
								</option>
								<option value="Alinma Bank">Alinma Bank </option>
								<option value="Banque Saudi Fransi">
									{' '}
									Banque Saudi Fransi{' '}
								</option>
								<option value="Riyad Bank"> Riyad Bank </option>
								<option value="Samba Financial Group (Samba)">
									{' '}
									Samba Financial Group (Samba){' '}
								</option>
								<option value="Alawwal Bank"> Alawwal Bank </option>
								<option value="Al Rajhi Bank"> Al Rajhi Bank </option>
								<option value="Arab National Bank"> Arab National Bank </option>
								<option value="Bank AlBilad"> Bank AlBilad </option>
								<option value="Bank AlJazira"> Bank AlJazira </option>
								<option value="Gulf International Bank Saudi Aribia (GIB-SA)">
									{' '}
									Gulf International Bank Saudi Aribia (GIB-SA){' '}
								</option>
							</select>
							{errors ?.bankName ?.types ?.required && (
								<p style={{ color: 'red' }}>Bank Name is required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">Iqama Copy Upload</label>
							<div className="input-group">
								<div className="input-group">
									<div className="col">
										<input
											type="file"
											accept=".png, .jpg, .jpeg, .pdf"
											className="form-control"
											placeholder="RegistrationFile"
											onChange={(e) => {
												uploadFile(e.target.files[0]);
											}}
											required={true}
										/>
									</div>
								</div>
							</div>
						</div>
					</div> */}
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="iban">IBAN</label>
							<input
								name="iban"
								type="text"
								className="form-control"
								placeholder="IBAN"
								ref={register({ required: true })}
							/>
							{errors?.iban?.types?.required && (
								<p style={{ color: 'red' }}>IBAN is required</p>
							)}
						</div>
					</div>
					<div className="btn-container float-right margintop30 form-row">
						<div className="col-sm-12">
							<button
								className="btn btn-primary dark-grey mr-1"
								type="button"
								onClick={() => hist.goBack()}
							>
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
