import React, {Component} from "react";
import "./RequestsItem.less";
import  LeftArrow from "../../../img/left-arrow.svg";
import {auth, database} from "../../firebase";
import { render } from "less";

class RequestsItem extends Component {
  constructor(props) {
    super(props);
  }
  takeOrder = ((orderID, index) => {
    let user = auth.currentUser;
    if (user != null) {
      this.props.takeOrder();
      let ref = database.ref(`users/${user.uid}/takenOrders`),
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
      });
    }
    else {
    
    }
  });
  render() {
    const products = this.props.products;
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
      <div onClick = {this.props.clickHandler} className = {"item"} data-idnumber>
        <span className = {"item__name"}>
          <LeftArrow className = {"item__arrow"}/>
          {this.props.name}
          </span>
        <span className = {"item__price"}>{this.props.price} рублей</span>
        <span className = {"item__markup"}>{this.props.markup}</span>
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
          <span className = {"item__addInfo"}>Номер корпуса:	&nbsp;{this.props.building}</span>
          <span className = {"item__addInfo"}>Номер комнаты:	&nbsp;{this.props.room}</span>
          <span className = {"item__addInfo"}>Комментарий заказчика:	&nbsp;{this.props.comment}</span>
          <span className = {"item__addInfo"}>Заказ выполнил:	&nbsp;{this.props.userName}&nbsp;{this.props.userSurname}</span>
          <span className = {"item__addInfo"}>Комментарий заказчика:	&nbsp;<a href = {this.props.link} className = "item__link">{this.props.link}</a></span>
          <button onClick = {() => this.takeOrder(this.props.orderID, this.index)} id = {"item__order_get"} className = {"item__order"}>Взять заказ</button>
        </div>
      </div>
    )
  }
  
}

export default RequestsItem;