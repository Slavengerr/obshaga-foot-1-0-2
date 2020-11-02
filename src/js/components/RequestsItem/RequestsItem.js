import React, {Component} from "react";
import "./RequestsItem.less";
import  LeftArrow from "../../../img/left-arrow.svg";

function RequestsItem(props) {
  const products = props.products;
  let items = products.map((curr, index) => {
    return (
      <tr key = {index}>
        <td className = {"products__item"}>{curr.name}</td>
        <td className = {"products__value"}>{curr.value}</td>
        <td className = {"products__isDiscount"}>{curr.discount}</td>
      </tr>
    )
  });
  return (
    <div onClick = {props.clickHandler} className = {"item"}>
      <span className = {"item__name"}>
        <LeftArrow className = {"item__arrow"}/>
        {props.name}
        </span>
      <span className = {"item__price"}>{props.price} рублей</span>
      <span className = {"item__markup"}>{props.markup}</span>
      <div className = {"item__hidden"}>
        <table className = {"products__info"}>
          <tbody>
            <tr>
              <td className = {"products__item"}>Название товара</td>
              <td className = {"products__value"}>Количество</td>
              <td className = {"products__isDiscount"}>Скидка</td>
            </tr>
            {items}
          </tbody>
        </table>
        <span className = {"item__addInfo"}>Номер корпуса:	&nbsp;{props.building}</span>
        <span className = {"item__addInfo"}>Номер комнаты:	&nbsp;{props.room}</span>
        <span className = {"item__addInfo"}>Комментарий заказчика:	&nbsp;{props.comment}</span>
        <button className = {"item__order"}>Взять заказ</button>
      </div>
    </div>
  )
}

export default RequestsItem;