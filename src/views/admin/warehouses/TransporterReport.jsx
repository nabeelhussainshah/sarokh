import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {
	warehouseListApi,
	getWarehouseShipmentsApi,
} from '../../../Api/adminApi';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import { useTransition, animated } from 'react-spring';
import Loading from '../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import { filter } from 'underscore';
import ReactToPrint from 'react-to-print';
import TransporterWayBill from './TransporterWayBill';

export default function TransporterReport(porps) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });
	const { register, handleSubmit, errors } = useForm();
	const componentRef = useRef();

	useEffect(() => {
		warehouseListApi()
			.then((res) => {
				setresponse({ loading: false, data: res });
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}, [response.loading]);

	const columns = [
		{
			Header: 'Tracking Number',
			accessor: 'trackingNumber',
		},
		{
			Header: 'Weight',
			accessor: 'weight',
		},
		{
			Header: 'Origin',
			Cell: (row) => {
				return <>{response.list.shipFromCity}</>;
			},
		},
		{
			Header: 'Destination',
			Cell: (row) => {
				return <>{response.list.shipToCity}</>;
			},
		},
		{
			Header: 'Shipper Id',
			Cell: (row) => {
				return <>{response.list.shipperId}</>;
			},
		},
	];

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: { opacity: 0 },
	});

	const onSubmit = (formData) => {
		getWarehouseShipmentsApi(formData.fromWarehouse)
			.then((res) => {
				setresponse({
					...response,
					list: filterCity(res, formData.toWarehouse),
				});
			})
			.catch((err) => {
				toast.error(err.message);
				setresponse({ loading: false, data: response.data });
			});
	};

	const filterCity = (data, city) => {
		const result = filter(data, function (doc) {
			return doc.shipToCity === city;
		})[0];

		if (result === undefined) {
			throw new Error('No records found');
		} else {
			return result;
		}
	};

	return response.loading ? (
		<Loading />
	) : (
		transitions.map(
			({ item, props, key }) =>
				item && (
					<animated.div key={key} style={props}>
						<Container>
							<div className="card-header">
								<h2 className="float-left">Transporter Report</h2>
								{response.list?.shipmentOrderItems && (
									<div style={{ width: '100%' }}>
										<div style={{ display: 'none' }}>
											<TransporterWayBill
												ref={componentRef}
												response={response}
												columns={columns}
											/>
										</div>
										<ReactToPrint
											trigger={() => (
												<button className="btn btn-primary mt-4 float-right">
													Print Report
												</button>
											)}
											content={() => componentRef.current}
											pageStyle="width:100%"
										/>
									</div>
								)}
							</div>
							<div className="card-body">
								<div className="form-row">
									<div className="form-group col-md-6">
										<label htmlFor="address">From Warehouse</label>
										<select
											type="text"
											className="form-control"
											name="fromWarehouse"
											placeholder="Select Owner"
											ref={register({
												required: true,
												validate: (data) =>
													data !== 'true' || 'Please select a Warehouse',
											})}
										>
											<option value="true">Select Warehouse</option>
											{response.data.warehouseList.map((obj) => {
												return (
													<option key={obj.id} value={obj.id}>
														{obj.name}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.fromWarehouse && errors.fromWarehouse.message}
										</span>
									</div>
									<div className="form-group col-md-6">
										<label htmlFor="address">To Warehouse</label>
										<select
											type="text"
											className="form-control"
											name="toWarehouse"
											placeholder="Select Owner"
											ref={register({
												required: true,
												validate: (data) =>
													data !== 'true' || 'Please select a Warehouse',
											})}
										>
											<option value="true">Select Warehouse</option>
											{response.data.warehouseList.map((obj) => {
												return (
													<option key={obj.id} value={obj.city}>
														{obj.name}
													</option>
												);
											})}
										</select>
										<span style={{ color: 'red' }}>
											{' '}
											{errors.toWarehouse && errors.toWarehouse.message}
										</span>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<button
											className="btn btn-info btnbrown"
											onClick={() => {
												handleSubmit(onSubmit)();
											}}
										>
											Get Detail
										</button>
									</div>
								</div>
								<Table
									data={
										response.list?.shipmentOrderItems
											? response.list.shipmentOrderItems
											: []
									}
									columns={columns}
									pagination={true}
									filter={true}
									tableclass={'table-responsive custom-table'}
								/>
							</div>
						</Container>
					</animated.div>
				)
		)
	);
}
