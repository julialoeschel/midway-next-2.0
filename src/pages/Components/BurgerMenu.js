import { useState } from "react";
import styled from "styled-components";
import BurgermenuIcon from "../assets/BurgermenuIcon.js";

export default function Burgermenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <MenuBar isShown={menuOpen}>
        <Heading2>Welcome</Heading2>
        <ul>
          <li>test</li>
        </ul>
      </MenuBar>

      <Button onClick={() => setMenuOpen(!menuOpen)}>
        <BurgermenuIcon />
      </Button>
    </>
  );
}

const Button = styled.button`
  padding: 24px;
  background-color: #949c9d;
  border: none;
  border-radius: 4rem;
  margin: 1rem;
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

const MenuBar = styled.section`
  position: absolute;
  right: 0px;
  width: 200px;
  z-index: 1;
  background-color: #949c9d;
  height: 100vh;
  top: 0;
  transform: ${(props) =>
    props.isShown ? "translateX(0px)" : "translateX(200px)"};
  transition: transform 1s ease-in;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 1rem;
  }
`;

const Heading2 = styled.h2`
  height: 20%;
  display: flex;
  align-items: end;
  color: #862400;
`;
