import React, {Component} from "react";
import "./CreateRequest.less";

class CreateRequest extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      products: []
    }

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
          <td className = {"product__name"}><input required className = {"product__input"} id = "product__name"></input></td>
          <td className = {"product__value"}><input requiredclassName = {"product__input"} id = "product__value"></input></td>
          <td className = {"product__discount"}><input requiredclassName = {"product__input"} id = "product__discount"></input></td>
          <td className = {"product__add"}><button className = {"product__addButton"} type = "button" onClick = {() => {this.submitOrder()}}>+</button></td>
        </tr>
      </>
    )
  };

  submitOrder() {
    let name = document.getElementById("product__name").value,
        value = document.getElementById("product__value").value,
        discount = document.getElementById("product__discount").value;
    
    this.setState({products: this.state.products.concat({name, value, discount})});
  }

  render() {
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
          <span className = {"request__priceValue request__span"}>
            Доплата
            <input type = "text" className = {"request__input"}></input>
          </span>
          <span className = {"request__priceValue request__span"}>
            Номер корпуса
            <input type = "text" className = {"request__input"}></input>
          </span>
          <span className = {"request__priceValue request__span"}>
            Номер комнаты
            <input type = "text" className = {"request__input"}></input>
          </span>
          <span className = {"request__priceValue request__span"}>
            Комментарий к доставке
            <input type = "text" className = {"request__input"}></input>
          </span>
          <button type = "submit" className = {"request__submit"}>Отправить заявку</button>
        </form>
      </div>
    )
  }
}

export default CreateRequest;