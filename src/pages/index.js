import Map from "./Components/Map";
import Head from "next/head";
import styled from "styled-components";

export default function Home() {
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
      <Map></Map>
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
