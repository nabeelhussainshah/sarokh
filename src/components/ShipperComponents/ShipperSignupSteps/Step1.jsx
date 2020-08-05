import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { state } from './state';
import axios from 'axios';
import Container from '../../Containers/ListingContainer';
import StepIndicator from "./StepIndicator";

export default function Step1(props) {
	const [data, setdata] = useRecoilState(state);
	const hist = useHistory();
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: "onChange",
		criteriaMode: "all"
	});

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata });
		hist.push('/shipper/signup/step2');
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
				<h2>Shipper Signup</h2>
			</div>
			<div className="card-body">
				<StepIndicator step1="current" />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="firstName">First Name</label>
							<input
								name="firstName"
								type="text"
								className="form-control"
								placeholder="First Name"
								ref={register({ required: true })}
							/>
							{errors ?.firstName ?.types ?.required && (
								<p style={{ color: 'red' }}>first Name is required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="lastName">Last Name</label>
							<input
								name="lastName"
								type="text"
								className="form-control"
								id="lastName"
								placeholder="Last Name"
								ref={register({ required: true })}
							/>
							{errors ?.lastName ?.types ?.required && (
								<p style={{ color: 'red' }}>last Name is required</p>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="contact">Contact No</label>
							<input
								name="contact"
								type="text"
								className="form-control"
								id="contact"
								placeholder="Contact No"
								ref={register({ required: true })}
							/>
							{errors ?.contact ?.types ?.required && (
								<p style={{ color: 'red' }}>contact is required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="email">Email</label>
							<input
								name="email"
								type="email"
								className="form-control"
								id="email"
								placeholder="Email"
								ref={register({ required: true })}
							/>
							{errors ?.email ?.types ?.required && (
								<p style={{ color: 'red' }}>email is required</p>
							)}
						</div>
					</div>
					<div className="form-row">
					<div className="form-group col-md-6">
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
						</div>
					{/* <div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="dateOfBirth">Date Of Birth</label>
							<input
								name="dateOfBirth"
								type="date"
								className="form-control"
								placeholder="Date Of Birth"
								ref={register({ required: true })}
							/>
							{errors ?.dateOfBirth ?.types ?.required && (
								<p style={{ color: 'red' }}>date of birth is required</p>
							)}
						</div>
					</div> */}
					<div className="btn-container float-right form-row">
						<div className="col-sm-12">
							<button className="btn btn-success mr-0" type="submit" disabled={data.iqamaFile === undefined ? true : false}>
								Next
						</button>
						</div>
					</div>
				</form>
			</div>
		</Container>
	);
}
