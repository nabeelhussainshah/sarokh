import React, { useState, useEffect, Fragment } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { CODShipmentsApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';

export default function RecordPayment(props) {
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
								<h2 className="float-left">Record Payment</h2>
							</div>
							<div className="card-body">//your code here</div>
						</Container>
					</animated.div>
				)
		)
	);
}
