import React, {Component} from "react";
import "./header__links.less";
import {NavLink, BrowserRouter as Router} from "react-router-dom";
import { auth } from "../../../firebase";

class HeaderLinks extends Component {
  
  signOut = () => {
    auth.signOut().then(function() {
      console.log("Выход произведен успешно");
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
        <NavLink exact activeClassName = {"header__link_active"} to = "/auth" className = {"header__link"}>Войти</NavLink>
        <button onClick = {this.signOut} className = "header__link">Выйти</button>
      </div> 
    )
  }
}

export default HeaderLinks;

