import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import Container from '../../components/Containers/ListingContainer';
import { GoogleMapComponent } from "../../components/GoogleMap/GoogleMapComponent";
import Table from "../../components/Generictable/generatictable";

export default function Maps(porps) {
	const [response, setresponse] = useState({loading: true});
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {
		async function fetchData()
		{
			await axios.get(`${process.env.REACT_APP_API}/shipper-warehouse/get-list-by-shipperId/${user.id}`)
			.then((res)=>{
				console.log(res);
				if(res.data.status === 200)
				{
					setresponse({loading: false, data: res.data.data});
				}
				else{
					toast.error('something went wrong');
				}
			})
			.catch((err)=>{
				toast.error(err.message);
			});
		}
		fetchData();
	}, []);

	const data = [];
	const columns = [
		{
			Header :'Actions',
			Cell: (row)=>{
				return (
					<>
					<i className="fa fa-edit" />&nbsp;&nbsp;
					<i className="fa fa-trash" />
					</>
				);
			}
		},
		{
			Header : 'Location Id',
			accessor : 'id'
		},
		{
			Header : 'Name',
			accessor : 'name'
		},
		{
			Header : 'Manager Name',
			accessor : 'managerName'
		},
		{
			Header : 'Manager Contact',
			accessor : 'mangerContact'
		},
		{
			Header : 'Address',
			accessor : 'address'
		},
		{
			Header : 'City',
			accessor : 'city'
		}
	];

	return response.loading ? <div>loading...</div> : (
		<Container>
			<div className="card-header">
				<h2>Our Location</h2>
			</div>
			<div className="card-body">
				<GoogleMapComponent
					isMarkerShown={true}
					position={response.data.mapLocations}
					changefunction={setresponse}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={
						<div style={{ height: `400px`, width: `85%`, margin: `0 auto` }} />
					}
					mapElement={<div style={{ height: `100%` }} />}
					autocomplete={false}
				/>
				<div className="margintop30"></div>
				<Table
				data={response.data.warehouseList}
				columns={columns}
				tableclass={"table-responsive custom-table"}
				pagination={true}
				filter={true} />

			</div>

		</Container>
	);
}
