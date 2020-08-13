import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import { uploadFile } from '../../Api/generalApi';
import StepIndicator from './StepIndicator';
import { toast } from 'react-toastify';

export default function BasicInformation(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(driverData);
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
				<h2>Add Driver</h2>
			</div>
			<div classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="current" />
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								className="form-control"
								name="firstName"
								placeholder="First Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.firstName && 'First Name is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								className="form-control"
								name="lastName"
								placeholder="Last Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.lastName && 'Last Name is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="contact">Contact No</label>
							<input
								type="text"
								className="form-control"
								name="contact"
								placeholder="Contact No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contact && 'Contact is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Email"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.email && 'Email is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">Profile Picture</label>
							<div className="input-group">
								<div className="col">
									<input
										type="file"
										accept=".png, .jpg, .jpeg, .pdf"
										className="form-control"
										placeholder="RegistrationFile"
										name="profilePicture"
										onChange={(e) => uploadPicture(e.target.files[0])}
									/>
								</div>
							</div>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="dateOfBirth">Date of Birth</label>
							<input
								type="date"
								className="form-control"
								name="dateOfBirth"
								placeholder="Date of Birth"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.dateOfBirth && 'DOB is required'}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-success"
							type="submit"
							disabled={data.profilePicture ? false : true}
						>
							Next Step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
