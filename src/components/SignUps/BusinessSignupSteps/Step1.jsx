import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { state } from './state';
import axios from 'axios';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';
import { joiResolver } from '@hookform/resolvers';
import { basicInformation } from '../../../formValidation/businessSignupValidation';

export default function Step1(props) {
	const [data, setdata] = useRecoilState(state);
	const hist = useHistory();
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
		resolver: joiResolver(basicInformation),
	});

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata });
		hist.push('/business/signup/step2');
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
					setdata({ ...data, iqamaFile: res.data.data });
				}
			})
			.catch((err) => {
				window.alert(err.message);
			});
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Business Signup</h2>
			</div>
			<div className="card-body">
				<StepIndicator step1="current" />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="firstName">First Name</label>
							<input
								id="firstName"
								name="firstName"
								type="text"
								className="form-control"
								placeholder="First Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.firstName && errors.firstName.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="lastName">Last Name</label>
							<input
								name="lastName"
								type="text"
								className="form-control"
								id="lastName"
								placeholder="Last Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.lastName && errors.lastName.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="contact">Contact No</label>
							<input
								name="contact"
								type="text"
								className="form-control"
								id="contact"
								placeholder="Contact No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contact && errors.contact.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="email">Email</label>
							<input
								name="email"
								type="email"
								className="form-control"
								id="email"
								placeholder="Email"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.email && errors.email.message}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="iqamaNumber">Commercial Registration (CR)</label>
							<input
								id="iqamaNumber"
								name="iqamaNumber"
								type="text"
								className="form-control"
								placeholder="Commercial Registration (CR)"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.iqamaNumber && errors.iqamaNumber.message}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label for="inputEmail4">
								Commercial Registration (CR) Upload
							</label>
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
					</div>
					<div className="btn-container float-right form-row">
						<div className="col-sm-12">
							<button
								className="btn btn-success mr-0"
								type="submit"
								disabled={data.iqamaFile === undefined ? true : false}
							>
								Next
							</button>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
