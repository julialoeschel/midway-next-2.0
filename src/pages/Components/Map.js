import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useEffect, useState } from "react";
import styled from "styled-components";
import center from "@turf/center";
import { featureCollection, point } from "@turf/helpers";
import HomeIcon from "public/images/HomeIcon";

export default function Map({ marker, onNewMarekr }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [centerOfMap, setCenterOfMap] = useState([10.0966, 50.97]);
  const [zoom, setZoom] = useState(4.5);
  let isMiddle = [0, 0];

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

      const pts = marker.map((marker) => {
        return [marker.lng, marker.lat];
      });

      if (pts.length > 1) {
        const featureCollection1 = featureCollection(
          pts.map((pt) => point(pt))
        );

        const middle = center(featureCollection1);
        isMiddle = middle.geometry.coordinates;

        //setMiddleMarekr
        new mapboxgl.Marker({ color: "#3F3dCE" })
          .setLngLat(isMiddle)
          .addTo(map);
      }

      if (map) {
        map.loadImage(
          "https://cdns.iconmonstr.com/wp-content/releases/preview/7.8.0/240/iconmonstr-quote-left-filled.png",
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
              console.log(feature.properties);
              const popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(`<h3>Hello</h3><p>loook at meeee</p>`)
                .addTo(map);
            });
          }
        );
      }
    }
  }, [pageIsMounted, marker]);

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

const Marker11 = styled.div`
  background-image: url("HomeIcon");
  background-size: cover;
`;
