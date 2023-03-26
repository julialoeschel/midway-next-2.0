import Map from "./Components/Map";
import Burgermenu from "./Components/BurgerMenu";
import Head from "next/head";
import styled from "styled-components";
import { useState } from "react";

export default function Home() {
  const [marker, setMarker] = useState([]);

  return (
    <MainPage>
      <Head>
        <title>Midway 2.0</title>
        <link rel="icon" href="/Marker.png" />
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Burgermenu></Burgermenu>
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
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;
