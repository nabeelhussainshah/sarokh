import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import StepIndicator from './StepIndicator';

export default function BasicInformation(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(driverData);
	const { register, errors, handleSubmit } = useForm({
		defaultValues: data,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	return (
		<Container>
			<div className="card-header">
				<h2>Add Driver</h2>
			</div>
			<div classname="card-body">
				<div className="margintop30">
					<StepIndicator />
				</div>
				<form className="margintop30">
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="username">Username</label>
							<input
								type="text"
								className="form-control"
								name="username"
								placeholder="Username"
								required
							/>
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
								required
							/>
						</div>
					</div>
					<div className="btn-container float-right">
						<button className="btn btn-secondary dark-grey" type="button">
							Previous Step
						</button>
						<button className="btn btn-success" type="button">
							Update
						</button>
						<button className="btn btn-success" type="button">
							Finish
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
