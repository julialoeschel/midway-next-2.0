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
      <Button
        onClick={() => {
          geocoder?.addTo("#geocoder");
          setButtonDisabled(true);
        }}
        disabled={buttonDisabled}
      >
        click to search location
      </Button>
      <GeoLocator ref={geocoderElement} id="geocoder"></GeoLocator>
      <Headline>your locations</Headline>
      <List>
        {locations.map((location) => (
          <li key={location.id}>
            <span>{location.name}</span>
            <button onClick={() => onDelete(location.id)}>x</button>
          </li>
        ))}
      </List>
      <List>
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
        {marker.length === 0 && locations.length === 0 ? (
          <p>no location jet</p>
        ) : null}
      </List>
    </>
  );
}

const Button = styled.button`
  margin: 2rem;
  background-color: ${(props) => (props.disabled ? "gray" : "#862400")};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 2rem;
`;

const GeoLocator = styled.div`
  padding: 1rem;
  height: 3.3rem;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0;
  margin: 1rem;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eefcfe;
    padding: 0 0.5rem;
    border-radius: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  button {
    width: 4rem;
    height: 2rem;
    border: none;
    background-color: transparent;
  }
`;

const Headline = styled.h2`
  padding: 1rem 1rem 0 1rem;
`;
