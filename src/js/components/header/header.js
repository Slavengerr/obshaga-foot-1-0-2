import React from "react";
import HeaderLinks from "./header__links/header__links";
import HeaderLogo from "../../../img/logofinalv2.png";
import HeaderMenu from "../../../img/menu.svg";
import "./header.less";

function Header() {
  return (
    <div className = {"header"}>
      <img className = {"header__logo"} src = {HeaderLogo}></img>
      <HeaderLinks />
      <HeaderMenu className = {"header__menu"}/>
    </div>
  )
}

export default Header;