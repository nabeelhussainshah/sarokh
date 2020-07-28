import React, { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import MainContainer from "../../components/Containers/MainContainer";

const MyMapComponent = withScriptjs(
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
          style={{ width: "100%" }}
          onPlaceSelected={(place) => {
            props.changefunction([
              ...props.position,
              {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              },
            ]);
          }}
          types={["(regions)"]}
          componentRestrictions={{ country: "SA" }}
        />
      </GoogleMap>
    );
  })
);

export default function Maps(porps) {
  const [state, setstate] = useState([{ lat: -34.397, lng: 150.644 }]);
  return (
    <MainContainer>
      <div className='card-header'>
        <h2>Our Location</h2>
      </div>
      <div className="card-body">
      <MyMapComponent
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
</MainContainer>
  );
}
