import { refresh } from "less";
import React, {Component} from "react";
import  LeftArrow from "../../../../img/left-arrow.svg";
import {auth, database} from "../../../firebase";
import "./TakenOrder.less";



function TakenOrder(props) {
  const products = props.products;

  function returnOrder(props, orderID) {
    let user = auth.currentUser,
        ref = database.ref("takenOrders/"),
        usersRef = database.ref("users/" + user.uid + "/takenOrders"),
        allTaken,
        usersTaken;
    console.log(props.returnBackOrder);
    props.returnBackOrder();
  
    usersRef.on("value", function(snapshot) {
      snapshot.forEach(function (childSnapshot) {
        usersTaken = childSnapshot.val();
      });
    });
  
    ref.on("value", function(snapshot) {
      snapshot.forEach(function (childSnapshot) {
        allTaken = childSnapshot.val();
      });
    });
  
    function remove(arr, item) {
      (~arr.indexOf(item)) ? 
        arr.splice(arr.indexOf(item), 1)
        : 
        null;
      return arr;
    }
    
    ref.set({
      takenOrders: remove(allTaken, orderID)
    });
  
    usersRef.set({
      takenOrders: remove(usersTaken, orderID)
    });
  }


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
        <button onClick = {() => returnOrder(props, props.orderID)} id = {"item__button_return"} className = {"item__return"}>Вернуть заказ</button>
      </div>
    </div>
  )
}

export default TakenOrder;