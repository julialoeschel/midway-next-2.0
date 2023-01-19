import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";

export default function Map() {
  const [pageIsMounted, setPageIsMounted] = useState(false);

  useEffect(() => {
    setPageIsMounted(true);
  }, []);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;
  const mapContainer = useRef(null);
  useEffect(() => {
    if (pageIsMounted) {
      const map = new mapboxgl.Map({
        container: "my-map",
        style: "mapbox://styles/mapbox/light-v10",
        center: [15.4542, 18.7322], // center map on Chad
        zoom: 1.8,
      });
    }
  }, [pageIsMounted]);

  return (
    <>
      <MapContainer id="my-map"></MapContainer>
    </>
  );
}

const MapContainer = styled.div`
  height: 90%;
  width: 90%;
`;
