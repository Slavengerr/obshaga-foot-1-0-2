import React from "react";
import "./ShowButton.less";

const ShowTakenButton = props => {
  return <button className = {"listNaming__button"} onClick = {props.showTaken}>Взятые заказы</button>
}

export default ShowTakenButton;