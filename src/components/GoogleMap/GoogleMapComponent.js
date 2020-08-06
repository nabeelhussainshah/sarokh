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
						return (
							<Marker
								position={{lat: parseFloat(doc.latitude), lng : parseFloat(doc.longitude)}}
								draggable={props.draggable}
								onDragEnd={(e) => {
									props.changeFunction({...props.globalState,location:[
										{
											latitude: e.latLng.lat(),
											longitude: e.latLng.lng(),
										}
									]});
								}}
							/>
						);
					})}
				{props.autocompleted ?
				<Autocomplete
					style={{ width: '100%'}}
					onPlaceSelected={(place) => {
						props.changeFunction({...props.globalState,location:[
							{
								label: place.formatted_address,
								latitude: place.geometry.location.lat(),
								longitude: place.geometry.location.lng(),
							}
						]});
					}}
					types={[]}
					componentRestrictions={{ country: 'SA' }}
				/> : null }
			</GoogleMap>
		);
	})
);
