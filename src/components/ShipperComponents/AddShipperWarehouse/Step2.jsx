import React from 'react';
import { warehouseData } from './state';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Container from '../../Containers/ListingContainer';
import StepIndicator from './StepIndicator';

export default function Step2(props) {
	const hist = useHistory();
	const [data, setdata] = useRecoilState(warehouseData);
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

	const onSubmit = (formdata) => {
		setdata({ ...data, ...formdata });
		console.log(formdata);
		hist.push(props.path);
	};

	return (
		<Container>
			<div className="card-header">
				<h2>Add New Location</h2>
			</div>
			<div className="card-body">
				<StepIndicator step1="done" step2="current" type={props.type} />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						{/* <div className="form-group col-md-6">
							<label htmlFor="managerName">Concern Person Name</label>
							<input
								type="text"
								className="form-control"
								name="managerName"
								placeholder="Concern Person Name"
								ref={register({ required: true })}
							/>

							{errors?.managerName?.types?.required && (
								<p style={{ color: 'red' }}>Name is required</p>
							)}
						</div> */}
						<div className="form-group col-md-6">
							<label htmlFor="mangerContact">Contact No</label>
							<input
								type="text"
								className="form-control"
								name="mangerContact"
								placeholder="Contact No"
								ref={register({})}
							/>
							{/* {errors?.mangerContact?.types?.required && (
								<p style={{ color: 'red' }}>Name is required</p>
							)} */}
						</div>
						{/* <div className="form-group col-md-6">
							<label htmlFor="mangerEmail">Email</label>
							<input
								type="email"
								className="form-control"
								name="mangerEmail"
								placeholder="Email"
								ref={register({ required: true })}
							/>
							{errors?.mangerEmail?.types?.required && (
								<p style={{ color: 'red' }}>Name is required</p>
							)}
						</div> */}
						<div className="form-group col-sm-6" />
						<div className="form-group col-md-6">
							<label htmlFor="operationalTimeto">Operationl Time From</label>
							<input
								type="time"
								className="form-control"
								placeholder="Operational Time To"
								name="operationalTimeto"
								ref={register({ required: true })}
							/>
							{errors ?.operationalTimeto ?.types ?.required && (
								<p style={{ color: 'red' }}>Name is required</p>
							)}
						</div>
						<div className="col-md-6">
							<label htmlFor="operationalTimeto">Operationl Time To</label>
							<input
								type="time"
								className="form-control"
								placeholder="Operational Time From"
								name="operationalTimefrom"
								ref={register({ required: true })}
							/>
							{errors ?.operationalTimefrom ?.types ?.required && (
								<p style={{ color: 'red' }}>Name is required</p>
							)}
						</div>
					</div>
					<div className="btn-container float-right">
						<button
							className="btn btn-danger mr-2"
							type="button"
							onClick={() => hist.goBack()}
						>
							Back
						</button>
						<button className="btn btn-success" type="submit">
							Next
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}

// console.log(moment(new Date()).format('hh:mm'))
// console.log(new Date(new Date().toDateString()+" "+"18:56"))
