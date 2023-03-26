import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { useEffect, useState } from "react";
import styled from "styled-components";
import center from "@turf/center";
import { featureCollection, point } from "@turf/helpers";

export default function Map({ marker, onNewMarekr, locations }) {
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [centerOfMap, setCenterOfMap] = useState([10.0966, 50.97]);
  const [zoom, setZoom] = useState(4.5);
  let isMiddle;

  const features1 = marker?.map((singleMarker) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [singleMarker.lng, singleMarker.lat],
      },
    };
  });

  const features2 = locations.map((location) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: location.coordinates,
      },
    };
  });

  const features = [...features1, ...features2];

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

      const pts1 = marker.map((marker) => {
        return [marker.lng, marker.lat];
      });
      const pts2 = locations.map((location) => {
        return location.coordinates;
      });

      const pts = [...pts1, ...pts2];

      if (pts.length > 1) {
        const formatFeatureCollection = featureCollection(
          pts.map((pt) => point(pt))
        );

        const middleObject = center(formatFeatureCollection);
        isMiddle = middleObject.geometry.coordinates;

        //setMiddleMarekr
        new mapboxgl.Marker({ color: "#3F3dCE" })
          .setLngLat(isMiddle)
          .addTo(map);
      }

      if (map) {
        map.loadImage(
          "https://midway-next-2-0.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarker.165a5d8f.png&w=64&q=75",
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
                  "text-anchor": "bottom",
                  "icon-anchor": "bottom",
                  "icon-size": 0.3,
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
                .setHTML(`<h3>Hello</h3><p>I am your location</p>`)
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
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  border-radius: 1rem;
`;
