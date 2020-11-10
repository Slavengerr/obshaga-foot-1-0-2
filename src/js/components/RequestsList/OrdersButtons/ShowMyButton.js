import React from "react";
import "./ShowButton.less";

const ShowMyButton = props => {
  return <button className = {"listNaming__button"} onClick = {props.showMy}>Взятые заказы</button>
}

export default ShowMyButton;