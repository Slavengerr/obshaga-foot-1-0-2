import React, {Component} from "react";
import "./RequestsItem.less";
import  LeftArrow from "../../../img/left-arrow.svg";
import {auth, database} from "../../firebase";



function takeOrder(orderID) {
  let user = auth.currentUser;
  let ref = database.ref(`users/${user.uid}`),
      addRef = database.ref("takenOrders/"),
      takenOrders = [],
      allTakenOrders = [];
  addRef.on("value", function(snapshot) {
    snapshot.forEach(function (childSnapshot) {
      allTakenOrders.push(...childSnapshot.val());
    });
  });
  allTakenOrders.push(orderID);
  addRef.update({
    takenOrders: allTakenOrders
  })
  ref.on("value", function(snapshot) {
    snapshot.forEach(function (childSnapshot) {
      takenOrders.push(...childSnapshot.val());
    });
  });

  takenOrders.push(orderID);
  ref.set({
    takenOrders
  })
  console.log(orderID);
}

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
    <div onClick = {props.clickHandler} className = {"item"} data-idnumber>
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
        <button onClick = {() => takeOrder(props.orderID)} className = {"item__order"}>Взять заказ</button>
      </div>
    </div>
  )
}

export default RequestsItem;