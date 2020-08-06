import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import Container from '../../Containers/ListingContainer';
import StepIndicator from "./StepIndicator";
import { GoogleMapComponent } from '../../GoogleMap/GoogleMapComponent';
import {warehouseData} from './state';
import {useForm} from 'react-hook-form';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';


export default function Step1(props) {

    const hist = useHistory();
    const [response, setresponse] = useState({loading : true});
    const [data,setdata] = useRecoilState(warehouseData);
    const {register,errors,handleSubmit} = useForm(
        {
            defaultValues: data,
            shouldFocusError : true,
            mode: "onChange",
            criteriaMode: "all"
        }
    );

    console.log(data);


    useEffect(() => {
		async function fetchData() {
			await axios
				.get(`${process.env.REACT_APP_API}/country/get-countries-list`)
				.then((res) => {
					console.log(res);
					if (res.data.status === 200) {
						setresponse({ loading: false, countries: res.data.data });
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		}
		fetchData();
    }, []);

    const getCities = async (countryCode) => {
		await axios
			.get(`${process.env.REACT_APP_API}/city/get-country-city/${countryCode}`)
			.then((res) => {
				console.log(res);
				if (res.data.status === 200) {
					setresponse({ ...response, loading: false, cities: res.data.data });
				}
			})
			.catch((err) => {
				toast.error(err.message);
			});
    };

    const onSubmit = (formdata) => {
        setdata({ ...data, ...formdata });
        hist.push('/shipper/addshipperwarehouse/step2');

	};

	return response.loading ? <div>Loading...</div> : (
		<Container>
			<div className="card-header">
				<h2>Add New Location</h2>
			</div>
			<div className="card-body">
                <StepIndicator step1="current" />
				<form className="margintop30" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								name="name"
                                placeholder="Name"
                                ref={register({required: true})}
							/>
                            	{errors?.name?.types?.required && (
								<p style={{ color: 'red' }}>Name is required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="address">Address</label>
							<input
								type="text"
								className="form-control"
								name="address"
                                placeholder="Address"
                                ref={register({required: true})}
							/>
                            	{errors?.address?.types?.required && (
								<p style={{ color: 'red' }}>address is required</p>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label>Select Country</label>
							<select
								id="selectid"
								className="form-control"
								name="country"
								onChange={(e) => getCities(e.target.value)}
								ref={register({
									required: true,
									validate: (value) => value !== '',
								})}
							>
								<option key={12345} value="">
									---Select Country---
								</option>
								{response.countries.map((doc, i) => {
									return (
										<option key={i} value={doc.code}>
											{doc.name}
										</option>
									);
								})}
							</select>
							{errors?.country?.types?.required && (
								<p style={{ color: 'red' }}>country is required</p>
							)}
						</div>
						<div className="form-group col-md-6">
							<label>Select City</label>
							<select
								className="form-control"
								name="city"
								ref={register({
									required: true,
									validate: (value) => value !== '',
								})}
							>
								<option key={12345} value="">
									---Select City---
								</option>
								{data.city === undefined ? null : (
									<option value={data.city}>{data.city}</option>
								)}{' '}
								//this gets the value to get populated in this field when moving
								between steps from the global state if this form had been filled
								{response.cities === undefined
									? null
									: response.cities.map((doc, i) => {
											return (
												<option key={i} value={doc}>
													{doc}
												</option>
											);
									  })}
							</select>
							{errors?.city?.types?.required && (
								<p style={{ color: 'red' }}>city is required</p>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="postalCode">Post Code</label>
							<input
								type="text"
								className="form-control"
								name="postalCode"
                                placeholder="postalCode"
                                ref={register({required: true})}
							/>
                            	{errors?.postalCode?.types?.required && (
								<p style={{ color: 'red' }}>postal code is required</p>
							)}
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-12">
							<label htmlFor="latitude">Select Location</label>
							<GoogleMapComponent
								isMarkerShown={true}
                                position={data.location}
                                changeFunction={setdata}
                                draggable={true}
                                globalState={data}
                                autocompleted={true}
								googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
								loadingElement={<div style={{ height: `100%` }} />}
								containerElement={
									<div
										style={{ height: `400px`, width: `85%`, margin: `0 auto` }}
									/>
								}
								mapElement={<div style={{ height: `100%` }} />}
								autocomplete={false}
							/>
							<div className="form-row mt-2 margintop30">
								<div className="form-group col-md-6">
									<div>
										Latitude:
										<input className="form-control" type="text" value={data.location[0].latitude} />
									</div>
								</div>
								<div className="form-group col-md-6">
									<div>
                                        longitude:
										<input className="form-control" type="text" value={data.location[0].longitude}/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="btn-container float-right">
						<button className="btn btn-success" type="submit">
							Next Step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
