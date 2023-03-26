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

export default function Geocosing() {
  const geocoderElement = useRef();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  geocoder?.on("result", (event) => {
    console.log("event", event);
    geocoder.clear();
  });

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
    </>
  );
}

const GeoCoder = styled.div`
  height: 36px;
  overflow: hidden;
`;
