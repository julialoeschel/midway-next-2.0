import { useState } from "react";
import styled from "styled-components";
import BurgermenuIcon from "../assets/BurgermenuIcon.js";

export default function Burgermenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {menuOpen ? (
        <>
          <MenuBar isShown={menuOpen}>
            <Button onClick={() => setMenuOpen(false)}>
              <BurgermenuIcon />
            </Button>
            <ul>
              <li>test</li>
            </ul>
          </MenuBar>
        </>
      ) : (
        <Button onClick={() => setMenuOpen(true)}>
          <BurgermenuIcon />
        </Button>
      )}
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
  right: -200px;
  width: 200px;
  z-index: 1;
  background-color: #949c9d;
  height: 100vh;
  top: 0;
  transform: ${(prop) =>
    prop.isShown ? "translateX(-200px)" : "translateX(0)"};
  transition: transform 0.4s ease-in;
`;
