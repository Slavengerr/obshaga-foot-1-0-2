import React, {Component} from "react";
import "./CreateRequest.less";
import database from "../../firebase";
import SubmitRequest from "./SubmitRequest/SubmitRequest";

let ref = database.ref("orders"),
    data;

ref.on("value", function(snapshot) {
  snapshot.forEach(function (childSnapshot) {
    data = childSnapshot.val();
  });
});    

class CreateRequest extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products: []
    }

  }

  submitForm = (event) => {
    event.preventDefault();
    
    let wrapper = document.querySelector(".request__wrapper"),
        building = wrapper.querySelector("#order__building"),
        markup = wrapper.querySelector("#order__markup"),
        room = wrapper.querySelector("#order__room"),
        comment = wrapper.querySelector("#order__comment"),
        request = {
          products: this.state.products,
          building: building.value,
          markup: markup.value,
          room: room.value,
          comment: comment.value
        };
    console.log(request);
    SubmitRequest.create(request);
  }

  deleteOrder = (index) => {
    let array = this.state.products;
    array.splice(index, 1);
    this.setState({
      products: array
    });
  }

  createOrder = () => {
    return (
      <>
        <tr id = "product__row">
          <td className = {"product__name"}><input required type = "text" className = {"product__input"} id = "product__name"></input></td>
          <td className = {"product__value"}><input required type = "text" className = {"product__input"} id = "product__value"></input></td>
          <td className = {"product__discount"}>
            <div className = "product__discount_wrapper">
              <input required type = "checkbox" className = {"product__input"} id = "product__discount"></input>
              <label className = {"product__input_checkbox"} id = "product__discount_checkbo" htmlFor="product__discount"></label>
            </div>
          </td>
          <td className = {"product__add"}><button className = {"product__addButton"} type = "button" onClick = {() => {this.submitOrder()}}>+</button></td>
        </tr>
      </>
    )
  };

  submitOrder() {
    let name = document.getElementById("product__name").value,
        value = document.getElementById("product__value").value,
        discount = document.getElementById("product__discount").checked ? "Да" : "Нет";
    
    this.setState({products: this.state.products.concat({name, value, discount})});
  }

  render() {
    console.log(data);
    console.log(this.state);
    let itemNew = this.state.products.map((curr, index) => {
      return (
        <>
          <tr id = "product__row">
            <td className = {"product__name"}>{curr.name}</td>
            <td className = {"product__value"}>{curr.value}</td>
            <td className = {"product__discount"}>{curr.discount}</td>
            <td className = {"product__add"}><button className = {"product__addButton"} type = "button"  onClick = {() => {this.deleteOrder(index)}}>x</button></td>
          </tr>
        </>
      )
    })
    return (
      <div className = {"request"}>
        <h2 className = {"request__heading"}>Создание заказа</h2>
        <form className = {"request__form"}>
          <table className = {"request__product product"}>
            <tbody id = "product__body">
              <tr>
                  <td className = {"product__name"}><span>Название</span></td>
                  <td className = {"product__value"}><span>Величина</span></td>
                  <td className = {"product__discount"}><span>Скидка</span></td>
                  <td className = {"product__add"}></td>
              </tr>
              {this.createOrder()}
              {itemNew}
            </tbody>
          </table>
          <div className = "request__wrapper">
            <span className = {"request__priceValue request__span"}>
              Доплата
              <input id = {"order__markup"} type = "text" className = {"request__input"}></input>
            </span>
            <span className = {"request__priceValue request__span"}>
              Номер корпуса
              <input id = {"order__building"} type = "text" className = {"request__input"}></input>
            </span>
            <span className = {"request__priceValue request__span"}>
              Номер комнаты
              <input id = {"order__room"} type = "text" className = {"request__input"}></input>
            </span>
            <span className = {"request__priceValue request__span"}>
              Комментарий к доставке
              <input id = {"order__comment"} type = "text" className = {"request__input"}></input>
            </span>
            <button type = "submit" onClick = {this.submitForm} className = {"request__submit"}>Отправить заявку</button>
            </div>
        </form>
      </div>
    )
  }
}

export default CreateRequest;

