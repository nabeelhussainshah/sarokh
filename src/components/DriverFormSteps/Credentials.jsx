import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import StepIndicator from './StepIndicator';
import { Redirect } from 'react-router-dom';
import { addDriver } from '../../Api/adminApi';
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

	if (Object.keys(data).length === 1 && data.constructor === Object) {
		return <Redirect to={props.defaultPath} />;
	}

	console.log(data);

	if (data.ready && data.update === undefined) {
		addDriver(data)
			.then((res) => {
				toast.success('driver successfully added');
			})
			.catch((err) => {
				toast.error(err.message);
			});
	} else {
		console.log('update code here');
	}

	const onSubmit = (formData) => {
		setdata({ ...data, ...formData, ready: true });
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Add Driver</h2>
			</div>
			<div classname="card-body">
				<div className="margintop30">
					<StepIndicator
						step1="done"
						step2="done"
						step3="done"
						step4="done"
						step5="current"
					/>
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								className="form-control"
								name="username"
								placeholder="Username"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.username && 'Username is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="password">Passsword</label>
							<input
								type="password"
								className="form-control"
								name="password"
								placeholder="Passsword"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.password && 'Password is required'}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-secondary dark-grey"
							type="button"
							onClick={() => hist.goBack()}
						>
							Previous Step
						</button>
						{data.update ? (
							<button className="btn btn-success" type="submit">
								Update
							</button>
						) : (
							<button className="btn btn-success" type="submit">
								Finish
							</button>
						)}
					</div>
				</form>
			</div>
		</Container>
	);
}