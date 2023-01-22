import Map from "./Components/Map";
import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

export default function Home() {
  const [marker, setMarker] = useState([]);
  const [center, setCenter] = useState(null);

  return (
    <MainPage>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Map
        marker={marker}
        onNewMarekr={(lngLatObject) =>
          setMarker((prev) => [...prev, lngLatObject])
        }
      ></Map>
    </MainPage>
  );
}

const MainPage = styled.div`
  height: 100vh;
  width: 100vw;
  background: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
