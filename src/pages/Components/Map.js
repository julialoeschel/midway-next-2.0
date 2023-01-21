import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import markerImage from "../../../public/images/Marker.png";
import Image from "next/image";

export default function Map({ marker, onNewMarekr }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [centerOfMap, setCenterOfMap] = useState([10.0966, 50.97]);
  const [zoom, setZoom] = useState(4.5);

  const features = marker.map((singleMarker) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [singleMarker.lng, singleMarker.lat],
      },
    };
  });

  useEffect(() => {
    setPageIsMounted(true);
  }, []);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN;

  useEffect(() => {
    if (pageIsMounted) {
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v10",
        center: centerOfMap, // center map on Chad
        zoom: zoom,
      });

      if (map) {
        map.loadImage(
          "data:image/png;base64,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",
          (error, image) => {
            if (error) throw error;
            map.on("load", () => {
              map.addImage("custom-marker", image);

              map.addSource("point", {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: features,
                },
              });
              map.addLayer({
                id: "points",
                type: "symbol",
                source: "point",
                layout: {
                  "icon-image": "custom-marker",
                  // get the title name from the source's "title" property
                  "text-field": ["get", "title"],
                  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                  "text-offset": [0, 1.25],
                  "text-anchor": "top",
                  "icon-size": 0.1,
                },
              });
            });

            map.on("click", (event) => {
              const center = map.getCenter();
              setCenterOfMap(center);
              const zoom = map.getZoom();
              setZoom(zoom);

              const features = map.queryRenderedFeatures(event.point, {
                layers: ["points"],
              });
              if (!features.length) {
                onNewMarekr(event.lngLat);
                return;
              }
              const feature = features[0];
              const popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(
                  `<h3>${feature.properties.title}</h3><p>loook at meeee</p>`
                )
                .addTo(map);
            });
          }
        );
      }
    }
  }, [pageIsMounted, marker]);

  console.log("center", centerOfMap);

  return (
    <>
      <MapContainer id="map"></MapContainer>
    </>
  );
}

const MapContainer = styled.div`
  height: 90%;
  width: 90%;
`;
