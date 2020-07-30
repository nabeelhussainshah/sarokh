import React, { useState } from 'react';
import Container from '../../components/Containers/ListingContainer';
import { GoogleMapComponent } from "../../components/GoogleMap/GoogleMapComponent";

export default function Maps(porps) {
	const [state, setstate] = useState([{ lat: -34.397, lng: 150.644 }]);
	return (
		<Container>
			<div className="card-header">
				<h2>Our Location</h2>
			</div>
			<div className="card-body">
				<GoogleMapComponent
					isMarkerShown={true}
					position={state}
					changefunction={setstate}
					googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={
						<div style={{ height: `400px`, width: `85%`, margin: `0 auto` }} />
					}
					mapElement={<div style={{ height: `100%` }} />}
				/>
			</div>
		</Container>
	);
}
