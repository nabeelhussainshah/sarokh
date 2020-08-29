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

	const onSubmit = (formData) => {
		console.log(formData);
		setdata({ ...data, ...formData });
		hist.push(props.next);
	};

	const uploadContract = async (file) => {
		await uploadFile(file)
			.then((res) => {
				setdata({ ...data, contractFile: res });
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
					<StepIndicator
						step1="done"
						step2="done"
						step3="done"
						step4="current"
					/>
				</div>
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="compensationCycle">Compensation Cycle</label>
							<input
								type="text"
								className="form-control"
								name="compensationCycle"
								placeholder="Compensation Cycle"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.compensationCycle && 'Compensation Cycle is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="compensation">Compensation</label>
							<input
								type="text"
								className="form-control"
								name="compensation"
								placeholder="Compensation"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.compensation && 'Compensation is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="contractStartDate">Contract Starting</label>
							<input
								type="date"
								className="form-control"
								name="contractStartDate"
								placeholder="Contract Starting"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contractStartDate && 'Contract date is required'}
							</span>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="contactValidTill">Contract Valid Till</label>
							<input
								type="date"
								className="form-control"
								name="contractValidTill"
								placeholder="Contract Valid Till"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.contactValidTill && 'Contract Valid date is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="inputEmail4">Upload Contract</label>
							<div className="input-group">
								<div className="col p-0">
									<input
										type="file"
										accept=".png, .jpg, .jpeg, .pdf"
										className="form-control"
										placeholder="RegistrationFile"
										name="contractFile"
										onChange={(e) => uploadContract(e.target.files[0])}
									/>
								</div>
							</div>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="bank">Bank Name</label>
							<select
								className="form-control"
								name="bank"
								ref={register({
									required: true,
									validate: (value) => value !== 'true',
								})}
							>
								<option value="true">Select Bank Name</option>
								<option value="The National Commercial Bank">
									The National Commercial Bank{' '}
								</option>
								<option value="The Saudi British Bank">
									The Saudi British Bank{' '}
								</option>
								<option value="Saudi Investment Bank">
									Saudi Investment Bank{' '}
								</option>
								<option value="Alinma Bank">Alinma Bank </option>
								<option value="Banque Saudi Fransi">
									{' '}
									Banque Saudi Fransi{' '}
								</option>
								<option value="Riyad Bank"> Riyad Bank </option>
								<option value="Samba Financial Group (Samba)">
									{' '}
									Samba Financial Group (Samba){' '}
								</option>
								<option value="Alawwal Bank"> Alawwal Bank </option>
								<option value="Al Rajhi Bank"> Al Rajhi Bank </option>
								<option value="Arab National Bank"> Arab National Bank </option>
								<option value="Bank AlBilad"> Bank AlBilad </option>
								<option value="Bank AlJazira"> Bank AlJazira </option>
								<option value="Gulf International Bank Saudi Aribia (GIB-SA)">
									{' '}
									Gulf International Bank Saudi Aribia (GIB-SA){' '}
								</option>
							</select>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.bank && 'Bank is required'}
							</span>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="iban">IBAN</label>
							<input
								type="text"
								className="form-control"
								name="iban"
								placeholder="IBAN"
								ref={register({ required: true })}
							/>
							<span style={{ color: 'red' }}>
								{' '}
								{errors.iban && 'IBAN is required'}
							</span>
						</div>
					</div>
					<div className="btn-container float-right" style={{ margin: '10px' }}>
						<button
							className="btn btn-danger dark-grey m-2"
							type="button"
							onClick={() => hist.goBack()}
						>
							Go to previous step
						</button>
						<button
							className="btn btn-success"
							type="submit"
							disabled={data.contractFile ? false : true}
						>
							Next step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
