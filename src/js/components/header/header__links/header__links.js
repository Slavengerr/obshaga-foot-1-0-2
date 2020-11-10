import React, {Component} from "react";
import "./header__links.less";
import {NavLink, BrowserRouter as Router} from "react-router-dom";
import { auth } from "../../../firebase";

class HeaderLinks extends Component {
  
  signOut = () => {
    auth.signOut().then(function() {
      console.log("Выход произведен успешно");
      let logout = document.getElementById("header__link_logout"),
          login = document.getElementById("header__link_login");
      logout.style.display = "none";
      login.style.display = "block";
    }).catch(function(error) {
      console.log("Какая-то ошибка");
    });
    VK.Auth.logout(() => {
      console.log("Выход из ВК произведен успешно");
    });
  }

  render() {
    return (
      <div className = {"header__links"}>
        <NavLink exact activeClassName = {"header__link_active"} to = "/request" className = {"header__link"}>Создать заказ</NavLink>
        <NavLink exact activeClassName = {"header__link_active"} to = "/" className = {"header__link"}>Запросы</NavLink>
        <NavLink exact id = {"header__link_logout"} onClick = {this.signOut} activeClassName = {"header__link_active"} to = "/auth" className = {"header__link"}>Выйти</NavLink>
      </div> 
    )
  }
}

export default HeaderLinks;

