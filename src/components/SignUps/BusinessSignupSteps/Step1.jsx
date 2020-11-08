import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { businessSignupData } from './state';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';
import { joiResolver } from '@hookform/resolvers';
import { basicInformation } from '../../../formValidation/businessSignupValidation';

export default function Step1(props) {
	const [data, setdata] = useRecoilState(businessSignupData);
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
								defaultValue="9665"
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
					<div className="btn-container float-right form-row">
						<div className="col-sm-12">
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
