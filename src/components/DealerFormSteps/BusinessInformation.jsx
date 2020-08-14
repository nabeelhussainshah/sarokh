import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { dealerData } from './state';
import { uploadFile } from '../../Api/generalApi';
import { cities } from '../../Utils/cities';
import StepIndicator from './StepIndicator';
import { toast } from 'react-toastify';

export default function BusinessInformation(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(dealerData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	console.log(data);

	const onSubmit = (formData) => {
		setdata({ ...data, ...formData });
		hist.push(props.next);
	};

	const uploadPicture = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, profilePicture: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Add Dealer</h2>
			</div>
			<div classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="done" step2="current" />
				</div>
				<form class="margintop30">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstName">Contract ID</label>
							<input
								type="text"
								class="form-control"
								name="contractId"
								placeholder="Enter Contract ID"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Contract Upload</label>
							<input
								type="file"
								accept=".png, .jpg, .jpeg, .pdf"
								className="form-control"
								placeholder="RegistrationFile"
								name="contactFile"
								// onChange={(e) => uploadContract(e.target.files[0])}
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstName">Contract Starting Date</label>
							<input
								type="date"
								class="form-control"
								name="contactStartDate"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Contract Ending Date</label>
							<input
								type="date"
								class="form-control"
								name="contractEndDate"
								required
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Compensation Per Shipment</label>
							<input
								type="text"
								class="form-control"
								name="compensationPerShipment"
								placeholder="Enter Amount in SAR"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Compensation Cycle</label>
							<input
								type="number"
								class="form-control"
								name="compensationCycle"
								placeholder="Enter No Of Days"
								required
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label htmlFor="bank">Bank Name</label>
							<select
								className="form-control"
								name="bank"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Select Bank Name</option>
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
							<span style={{ color: 'red' }}>
								{' '}
								{errors.bank && 'Bank is required'}
							</span>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Enter IBAN</label>
							<input
								type="text"
								class="form-control"
								name="iban"
								placeholder="Enter IBAN"
								required
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Username</label>
							<input
								type="text"
								class="form-control"
								name="userName"
								placeholder="Enter Username"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Password</label>
							<input
								type="password"
								class="form-control"
								name="password"
								placeholder="Enter Password"
								required
							/>
						</div>
					</div>
					<div className="btn-container float-right">
						<button
							className="btn btn-secondary dark-grey"
							type="button"
							onClick={() => hist.goBack()}
						>
							Go to previous step
						</button>
						<button className="btn btn-success" type="submit">
							Next step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
