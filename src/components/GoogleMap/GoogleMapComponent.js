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
			<GoogleMap defaultZoom={6} defaultCenter={{ lat: 23.8859, lng: 39.1925 }}>
				{props.isMarkerShown &&
					props.position.map((doc) => {
						console.log(doc);
						return (
							<Marker
								position={{lat: parseFloat(doc.latitude), lng : parseFloat(doc.longitude)}}
								draggable={props.draggable}
								onDragEnd={(e) => {
									console.log(e.latLng.lat());
								}}
							/>
						);
					})}
				{props.autocomplete ?
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
				/> : null }
			</GoogleMap>
		);
	})
);
