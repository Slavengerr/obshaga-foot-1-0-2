import React from "react";
import "./header__links.less";
import {NavLink, BrowserRouter as Router} from "react-router-dom";
function HeaderLinks() {
  return (
    <div className = {"header__links"}>
      <NavLink exact activeClassName = {"header__link_active"} to = "/request" className = {"header__link"}>Создать заказ</NavLink>
      <NavLink exact activeClassName = {"header__link_active"} to = "/" className = {"header__link"}>Запросы</NavLink>
      <NavLink exact activeClassName = {"header__link_active"} to = "/auth" className = {"header__link"}>Войти</NavLink>
    </div> 
  )
}

export default HeaderLinks;

