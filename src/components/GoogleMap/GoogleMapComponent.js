import React, { Fragment, useState } from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';

export const GoogleMapComponent = withScriptjs(
	withGoogleMap((props) => {
		const [state, setstate] = useState(false);

		function changeLocation(type, data) {
			switch (type) {
				case 'MarkerDrag':
					props.changeFunction({
						...props.globalState,
						location: [
							{
								latitude: data.latLng.lat(),
								longitude: data.latLng.lng(),
							},
						],
					});
					break;
				case 'AutoComplete':
					props.changeFunction({
						...props.globalState,
						location: [
							{
								label: data.formatted_address,
								latitude: data.geometry.location.lat(),
								longitude: data.geometry.location.lng(),
							},
						],
					});
			}
		}
		return (
			<GoogleMap defaultZoom={6} defaultCenter={{ lat: 23.8859, lng: 39.1925 }}>
				{props.isMarkerShown &&
					props.position.map((doc) => {
						return (
							<Fragment>
								<Marker
									position={{
										lat: parseFloat(doc.latitude),
										lng: parseFloat(doc.longitude),
									}}
									draggable={props.draggable}
									onDragEnd={(e) => changeLocation('MarkerDrag', e)}
									onMouseOver={(e) => setstate(doc.label)}
									onMouseOut={(e) => setstate(false)}
								>
									{state === doc.label && doc.label !== undefined && (
										<InfoWindow>
											<p
												style={{
													color: 'red',
													padding: 'unset',
													margin: 'unset',
													fontWeight: 'bold'
												}}
											>
												{doc.label}
											</p>
										</InfoWindow>
									)}
								</Marker>
							</Fragment>
						);
					})}
				{props.autocompleted ? (
					<Autocomplete
						style={{ width: '100%' }}
						onPlaceSelected={(place) => changeLocation('AutoComplete', place)}
						types={[]}
						componentRestrictions={{ country: 'SA' }}
					/>
				) : null}
			</GoogleMap>
		);
	})
);
