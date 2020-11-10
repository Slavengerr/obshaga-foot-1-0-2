import React from "react";
import "./ShowButton.less";

const ShowAllButton = props => {
  return <button className = {"listNaming__button"} onClick = {props.showAll}>Все заказы</button>
}

export default ShowAllButton;