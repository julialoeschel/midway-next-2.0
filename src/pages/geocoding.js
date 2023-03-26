import styled from "styled-components";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useRef, useState } from "react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

// Add the control .
let geocoder;
geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

export default function Geocoding({ locations, onNewLocation, onDelete }) {
  const geocoderElement = useRef();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  geocoder?.on("result", (event) => {
    const newLocation = {
      id: event.result.id,
      coordinates: event.result.center,
      name: event.result.text,
    };

    onNewLocation(newLocation);
    geocoder.clear();
  });

  console.log(locations);

  return (
    <>
      <button
        onClick={() => {
          geocoder?.addTo("#geocoder");
          setButtonDisabled(true);
        }}
        disabled={buttonDisabled}
      >
        click to search location
      </button>
      <GeoCoder ref={geocoderElement} id="geocoder"></GeoCoder>
      <ul>
        {locations.map((location) => (
          <li>
            <span>{location.name}</span>
            <button onClick={() => onDelete(location.id)}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
}

const GeoCoder = styled.div``;
