import OrderDetails from '../../components/ShipperComponents/ShipperDetailsComponents/OrderDetails';
import PaymentDetails from '../../components/ShipperComponents/ShipperDetailsComponents/PaymentDetails';
import RecieverDetails from '../../components/ShipperComponents/ShipperDetailsComponents/RecieverDetails';
import ShipmentDelieveryStatus from '../../components/ShipperComponents/ShipperDetailsComponents/ShipmentDelieveryStatus';
import ShipmentDetail from '../../components/ShipperComponents/ShipperDetailsComponents/ShipmentDetail';
import Container from '../../components/Containers/OrderDetailsContainer';
import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { isUndefined } from 'underscore';

export default function ShipmentDetails(props) {
	const loc = useLocation();
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: true });

	useEffect(() => {
		async function fetchData() {
			return await axios
				.get(`${process.env.REACT_APP_API}/order/get-details/${loc.state.id}`)
				.then((response) => {
					setresponse({ loading: false, data: response.data.data });
				})
				.catch((err) => {
					window.alert(err.message);
				});
		}
		if (isUndefined(loc.state)) {
			hist.goBack();
		} else {
			fetchData();
		}
	}, []);

	return response.loading ? (
		<div>Loading...</div>
	) : (
		<Container>
			<OrderDetails response={response.data} />
			<RecieverDetails response={response.data.shipmentOrderItems[0]} />
			<ShipmentDetail response={response.data.shipmentOrderItems[0]} />
			<PaymentDetails response={response.data.shipmentOrderItems[0]} />
			<ShipmentDelieveryStatus />
		</Container>
	);
}
