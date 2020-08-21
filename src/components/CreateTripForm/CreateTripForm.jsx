import React, { useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';

export default function CreateTripForm(props) {
	const { register, errors, handleSubmit } = useForm({
		defaultValues: props.listing.id,
		shouldFocusError: true,
		mode: 'onChange',
		criteriaMode: 'all',
	});

	const onSubmit = (data) => {
		props.setId({ ...props.listing, loading: true, id: data });
	};
	return (
		<Fragment>
			<div className="form-row mb-3">
				<div className="col">
					<select
						className="form-control"
						name="warehouse"
						ref={register({
							required: true,
							validate: (value) => value !== 'true',
						})}
					>
						<option value="true">--- Select Warehouse ---</option>
						{props.listing.data.warehouses.map((doc, i) => {
							return (
								<option key={i} value={doc.id}>
									{doc.address}
								</option>
							);
						})}
					</select>
				</div>
				<div className="col">
					<select
						className="form-control"
						name="vehicle"
						ref={register({
							required: true,
							validate: (value) => value !== 'true',
						})}
					>
						<option value="true">--- Select Vehicle ---</option>
						{props.listing.data.vehicles.map((doc, i) => {
							return (
								<option key={i} value={doc.id}>
									{doc.name}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div className="form-row mb-3">
				<div className="col">
					<select
						className="form-control"
						name="driver"
						ref={register({
							required: true,
							validate: (value) => value !== 'true',
						})}
					>
						<option value="true">--- Select Driver ---</option>
						{props.listing.data.drivers.map((doc, i) => {
							return (
								<option key={i} value={doc.id}>
									{doc.user.fullName}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div className="form-row mb-3">
				<div className="col-sm-12">
					<button
						type="button"
						className="btn btn-success mb-3"
						onClick={() => handleSubmit(onSubmit)()}
					>
						Fetch Details
					</button>
					<div className="clearfix"></div>
				</div>
			</div>
			<div className="row">
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">45</span>
								<br />
								Point Pick up
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">45</span>
								<br />
								Shipper Pick up
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">45</span>
								<br />
								Deliveries to Point
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">45</span>
								<br />
								Deliveries to Lastmile
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">45</span>
								<br />
								Lastmile COD
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="flex-row col-md-2">
					<div className="thumnail-box custom-dashboard-box">
						<div className="icon color-default fs-26 mr-10 float-left">
							<i className="fa fa-usd font40"></i>
						</div>
						<div className="float-left">
							<p>
								<span className="font20">45</span>
								<br />
								Point Collection
							</p>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}