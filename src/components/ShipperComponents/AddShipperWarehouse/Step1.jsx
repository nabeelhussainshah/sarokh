import React from 'react';
import Container from '../../Containers/ListingContainer';
export default function Step1(props) {
	return (
		<Container>
			<div className="card-header">
				<h2>Shipper Signup</h2>
			</div>
			<div className="card-body">
				<form className="margintop30">
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								className="form-control"
								name="firstName"
								placeholder="First Name"
								required
							/>
							<div className="invalid-feedback">
								<div>First Name is required</div>
							</div>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								className="form-control"
								name="lastName"
								placeholder="Last Name"
								required
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="contact">Contact No</label>
							<input
								type="text"
								className="form-control"
								name="contact"
								placeholder="Contact No"
								required
							/>
						</div>
						<div className="form-group col-md-6">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Email"
								required
							/>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label htmlFor="dateOfBirth">Date Of Birth</label>
							<input type="date" name="dateOfBirth" className="form-control" />
						</div>
					</div>
					<div className="btn-container float-right">
						<button className="btn btn-success" type="button">
							Next Step
						</button>
					</div>
				</form>
			</div>
		</Container>
	);
}
