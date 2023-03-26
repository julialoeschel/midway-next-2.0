import styled from "styled-components";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useRef, useState } from "react";
import Link from "next/link";
import Burgermenu from "./Components/BurgerMenu";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

// Add the control .
let geocoder;
geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

export default function Geocoding({
  locations,
  onNewLocation,
  onDelete,
  marker,
  onDeleteMarker,
}) {
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

  return (
    <>
      <Burgermenu></Burgermenu>

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
          <li key={location.id}>
            <span>{location.name}</span>
            <button onClick={() => onDelete(location.id)}>x</button>
          </li>
        ))}
      </ul>
      <ul>
        {marker.map((markerr, index) => {
          return (
            <li key={markerr.lat + markerr.lng}>
              <span>
                location {index + 1} [{markerr.lng.toFixed(1)}|{" "}
                {markerr.lat.toFixed(1)}]
              </span>
              <button onClick={() => onDeleteMarker(markerr.lng, markerr.lat)}>
                x
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const GeoCoder = styled.div``;
