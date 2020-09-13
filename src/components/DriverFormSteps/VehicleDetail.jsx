import React from 'react';
import Container from '../Containers/ListingContainer';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { driverData } from './state';
import StepIndicator from './StepIndicator';
import { toast } from 'react-toastify';
import { uploadFile } from '../../Api/generalApi';
import { Redirect } from 'react-router-dom';

export default function VehicleDetail(props) {
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

	const onSubmit = (formData) => {
		console.log(formData);
		setdata({ ...data, ...formData });
		hist.push(props.next);
	};

	const uploadRegistrationFile = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, registrationFile: res });
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
			<div style={{ padding: '25px' }} classname="card-body">
				<div className="margintop30">
					<StepIndicator step1="done" step2="done" step3="current" />
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="name">Vehicle Name</label>
							<input
								type="text"
								className="form-control"
								name="vehicleName"
								placeholder="Vehicle Name"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.vehicleName && 'Vehicle Name is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="model">Vehicle Model</label>
							<input
								type="text"
								className="form-control"
								name="vehicleModel"
								placeholder="Vehicle Model"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.vehicleModel && 'Vehicle Model is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="make">Vehicle Maker</label>
							<input
								type="text"
								className="form-control"
								placeholder="Vehicle Maker"
								name="make"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.make && 'Vehicle Maker is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="type">Vehicle Type</label>
							<input
								type="text"
								className="form-control"
								name="type"
								placeholder="Vehicle Type"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.type && 'Vehicle Type is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="cargoCapacity">Vehicle Cargo Capacity</label>
							<input
								type="number"
								className="form-control"
								name="cargoCapacity"
								placeholder="Vehicle Cargo Capacity"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.cargoCapacity && 'Vehicle Cargo Capacity is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="registrationNumber">Vehicle Reg No</label>
							<input
								type="text"
								className="form-control"
								name="registrationNumber"
								placeholder="Vehicle Reg No"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.registrationNumber && 'Vehicle Reg No is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="registrationFile">
								Vehicle Registration Copy
							</label>
							<div className="col">
								<input
									type="file"
									accept=".png, .jpg, .jpeg, .pdf"
									className="form-control"
									placeholder="RegistrationFile"
									name="registrationFile"
									onChange={(e) => uploadRegistrationFile(e.target.files[0])}
								/>
							</div>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="productionYear">Production Year</label>
							<input
								type="number"
								className="form-control"
								name="productionYear"
								placeholder="Production Year"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.productionYear && 'Production Year is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="registrationYear">Registration Year</label>
							<input
								type="number"
								className="form-control"
								name="registrationYear"
								placeholder="Registration Year"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.registrationYear && 'Registration Year is required'}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-secondary dark-grey"
							type="button"
							onClick={() => hist.goBack()}
						>
							Go to previous step
						</button>
						<button
							className="btn btn-success"
							type="submit"
							disabled={data.registrationFile ? false : true}
						>
							Next step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
