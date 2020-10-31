import React from "react";
import HeaderLinks from "./header__links/header__links";
import HeaderLogo from "../../../img/ObshagaFoodLogo.png";
import "./header.less";

function Header() {
  return (
    <div className = {"header"}>
      <img className = {"header__logo"} src = {HeaderLogo}></img>
      <HeaderLinks />
    </div>
  )
}

export default Header;