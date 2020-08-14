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

export default function BasicInformation(props) {
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
					<StepIndicator step1="current" />
				</div>
				<form class="margintop30">
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstName">Owner Name</label>
							<input
								type="text"
								class="form-control"
								name="owner"
								placeholder="Owner Name"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Business Group Name: (Optional)</label>
							<input
								type="text"
								class="form-control"
								name="businessGroupName"
								placeholder="Business Group Name"
								required
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="firstName">Contact Number</label>
							<input
								type="text"
								class="form-control"
								name="contact"
								placeholder="Business Name"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Email</label>
							<input
								type="email"
								class="form-control"
								name="email"
								placeholder="abc@gmail.com"
								required
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">National ID/iqama Number</label>
							<input
								type="text"
								class="form-control"
								name="nicNumber"
								placeholder="National ID/iqama Number"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">National ID/iqama Copy:</label>
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
							<label for="lastName">Date Of Birth:</label>
							<input
								type="date"
								class="form-control"
								name="dateOfBirth"
								placeholder="DOB"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">Profile Picture</label>
							<input
								type="file"
								accept=".png, .jpg, .jpeg, .pdf"
								className="form-control"
								placeholder="RegistrationFile"
								name="profilePicture"
								// onChange={(e) => uploadContract(e.target.files[0])}
							/>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Country</label>
							<select
								type="text"
								class="form-control"
								name="country"
								placeholder="Country"
								required
							>
								<option value="SAU">Saudi Arabia</option>
							</select>
						</div>
						<div class="form-group col-md-6">
							<label for="firstName">City</label>
							<select
								type="text"
								class="form-control"
								name="city"
								placeholder="City"
								required
							>
								{cities.map((doc, i) => {
									return (
										<option key={i} value={doc}>
											{doc}
										</option>
									);
								})}
							</select>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="lastName">Address</label>
							<input
								type="text"
								class="form-control"
								name="address"
								placeholder="Address"
								required
							/>
						</div>
						<div class="form-group col-md-6">
							<label for="lastName">Post Code</label>
							<input
								type="text"
								class="form-control"
								name="postCode"
								placeholder="Full Name"
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
