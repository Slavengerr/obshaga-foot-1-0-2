import React, {Component} from "react";
import  LeftArrow from "../../../../img/left-arrow.svg";
import {auth, database} from "../../../firebase";
import "./MyOrder.less";



function MyOrder(props) {
  function deleteOrder(orderID, index) {
    let ref = database.ref("orders/");
  
    ref.on("value", function(snapshot) {
      let counter = 0;
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().id == orderID) {
          ref.child(Object.keys(snapshot.val())[counter]).remove();
        }
        counter++;
      });
    });
  }
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
    <div onClick = {props.clickHandler} id = {"item_wrapper"} className = {"item"} data-idnumber>
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
        <span className = {"item__addInfo"}>Заказ выполнил:	&nbsp;{props.userName}&nbsp;{props.userSurname}</span>
        <span className = {"item__addInfo"}>Комментарий заказчика:	&nbsp;<a href = {props.link} className = "item__link">{props.link}</a></span>
        <button onClick = {() => deleteOrder(props.id)} id = {"item__button_delete"} className = {"item__delete"}>Удалить заказ</button>
      </div>
    </div>
  )
}

export default MyOrder;