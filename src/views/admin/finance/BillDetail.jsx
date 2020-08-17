import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { CODShipmentsApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function BillDetail(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-270px,0,0)',
			transition: 'ease-out 0.3s',
		},
	});

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						{console.log(item)}
						<Container>
							<div className="card-header">
								<h2 className="float-left">Bill Detail</h2>
							</div>
							<div className="card-body billdetail">
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6"> Bill Type:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> [Bill Type]</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6"> Bill Category:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> [Bill Category]</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6"> User Type</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> Shipper/Driver/Dealer</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Bill To</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">[Biller Name]</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Creation Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> [Creation Date]</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Due Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> [Due Date]</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Starting Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">[Starting Date]</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Ending Date:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">[Ending Date]</p>
										</label>
									</div>
								</div>
								<div className="form-row">
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Wallet Name:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left"> [Bill Type]</p>
										</label>
									</div>
									<div className="col-sm-6">
										<label className="col-sm-6 col-6">Status:</label>
										<label className="col-sm-6 col-6">
											<p className=" text-left">Paid/ Unpaid/ Partially Paid</p>
										</label>
									</div>
								</div>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
