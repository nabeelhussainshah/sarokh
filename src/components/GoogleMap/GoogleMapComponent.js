import React from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';

export const GoogleMapComponent = withScriptjs(
	withGoogleMap((props) => {
		return (
			<GoogleMap defaultZoom={6} defaultCenter={{ lat: 23.8859, lng: 45.0792 }}>
				{props.isMarkerShown &&
					props.position.map((doc) => {
						return (
							<Marker
								position={doc}
								draggable={true}
								onDragEnd={(e) => {
									console.log(e.latLng.lat());
								}}
							/>
						);
					})}
				<Autocomplete
					style={{ width: '100%' }}
					onPlaceSelected={(place) => {
						props.changefunction([
							...props.position,
							{
								lat: place.geometry.location.lat(),
								lng: place.geometry.location.lng(),
							},
						]);
					}}
					types={['(regions)']}
					componentRestrictions={{ country: 'SA' }}
				/>
			</GoogleMap>
		);
	})
);
