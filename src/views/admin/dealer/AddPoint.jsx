import React, { useState, useEffect, Fragment } from 'react';
import ListingContainer from '../../../components/Containers/ListingContainer';
import Table from '../../../components/Generictable/generatictable';
import Loading from '../../../components/Loading/Loading';
import { useHistory } from 'react-router-dom';
import { allDealersApi } from '../../../Api/adminApi';
import { useTransition, animated } from 'react-spring';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function AddPoint(props) {
	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	console.log('sup');

	// useEffect(() => {
	// 	if (response.loading) {
	// 		allDealersApi()
	// 			.then((res) => {
	// 				setresponse({ loading: false, data: res });
	// 			})
	// 			.catch((err) => {
	// 				toast.error(err.message);
	// 			});
	// 	}
	// }, [response.loading]);

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
						<ListingContainer>
							<div className="card-header">
								<h2 className="float-left">Add Point</h2>
							</div>
							<div className="card-body">//code here</div>
						</ListingContainer>
					</animated.div>
				)
		)
	);
}
