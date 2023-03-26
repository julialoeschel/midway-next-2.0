import { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [locations, setLocations] = useState([]);

  function handleNewLocation(newLocation) {
    setLocations([...locations, newLocation]);
  }
  function handleDelete(id) {
    const updatedLocations = locations.filter((location) => location.id !== id);

    setLocations(updatedLocations);
  }

  return (
    <Component
      {...pageProps}
      locations={locations}
      onNewLocation={handleNewLocation}
      onDelete={handleDelete}
    />
  );
}

export default MyApp;
