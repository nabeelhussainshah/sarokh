import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import StepIndicator from './StepIndicator';
import { cities } from '../../Utils/cities';

export default function DriverDetails(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(driverData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	const onSubmit = (formData) => {
		console.log(formData);
		window.alert(JSON.stringify(formData));
		setdata({ ...data, ...formData });

		if (data.driverType === 'employee') {
			hist.push(props.next.step4);
		} else {
			hist.push(props.next.step3);
		}
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Add Driver</h2>
			</div>
			<div classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="done" step2="current" />
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-3">
						<label name="deliveryLocationRadio">type of driver</label>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="driverType"
								value="employee"
								onChange={() => {
									setdata({ ...data, driverType: 'employee' });
								}}
								ref={register()}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.driverType && 'this is required'}
							</span>
							<label className="form-check-label" htmlFor="indeliverycase">
								Employee
							</label>
						</div>
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="driverType"
								value="freeLancer"
								onChange={() => {
									setdata({ ...data, driverType: 'freeLancer' });
								}}
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.driverType && 'This field is required'}
							</span>
							<label className="form-check-label" htmlFor="selectNow">
								Free Lancer
							</label>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								className="form-control"
								name="address"
								placeholder="Address"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.address && 'Address is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label>Select Country</label>
							<select className="form-control" name="country">
								<option value="SAU">Saudi Arabia</option>
							</select>
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
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">---Select City---</option>
								{cities.map((city) => {
									return <option value={city}>{city}</option>;
								})}
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.city && 'City is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="postCode">Post Code</label>
							<input
								type="text"
								className="form-control"
								name="postCode"
								placeholder="Post Code"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.postCode && 'Post Code is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="nicNumber">Iqama/NIC/Passport No</label>
							<input
								type="text"
								className="form-control"
								name="nicNumber"
								placeholder="Iqama/NIC/Passport No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.nicNumber && 'NIC Number is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">
								Iqama/NIC/Passport Copy Upload
							</label>
							<div className="input-group">
								<div className="col">
									<input
										type="file"
										accept=".png, .jpg, .jpeg, .pdf"
										className="form-control"
										placeholder="RegistrationFile"
										name="nicFile"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="licenceNumber">Driver Licence No</label>
							<input
								type="text"
								className="form-control"
								name="licenseNumber"
								placeholder="Driver Licence No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.licenseNumber && 'license Number is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">Licence Copy Upload</label>
							<div className="input-group">
								<div className="col">
									<input
										type="file"
										accept=".png, .jpg, .jpeg, .pdf"
										className="form-control"
										placeholder="RegistrationFile"
										name="licenceFile"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="btn-container float-right margintop30">
						<button class="btn btn-secondary dark-grey" type="button">
							Go to previous step
						</button>
						<button class="btn btn-success" type="submit">
							Next step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
