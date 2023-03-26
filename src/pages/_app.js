import { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [locations, setLocations] = useState([]);
  const [marker, setMarker] = useState([]);

  function handleNewLocation(newLocation) {
    setLocations([...locations, newLocation]);
  }
  function handleDelete(id) {
    const updatedLocations = locations.filter((location) => location.id !== id);
    setLocations(updatedLocations);
  }

  function handleNweMarker(allMarker) {
    setMarker(allMarker);
  }

  function handleDeleteMarker(lng, lat) {
    console.log(lng, lat);
    console.log(marker[0].lng, lng);
    setMarker(
      marker.filter((markerr) => markerr.lng !== lng && markerr.lat !== lat)
    );
  }

  return (
    <Component
      {...pageProps}
      locations={locations}
      onNewLocation={handleNewLocation}
      onDelete={handleDelete}
      marker={marker}
      handleNweMarker={handleNweMarker}
      onDeleteMarker={handleDeleteMarker}
    />
  );
}

export default MyApp;
