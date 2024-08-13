import React from "react";
import Logo from "../img/home.png";

export const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="Loading..." />
      <span>
        © {new Date().getFullYear()} Mukesh Blog Demo | All Rights Reserved
      </span>
    </footer>
  );
};
