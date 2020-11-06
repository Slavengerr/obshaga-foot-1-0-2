import React from "react";
import "./RequestsList.less";
import RequestsItem from "../RequestsItem/RequestsItem";
import { database } from "../../firebase";

let ref = database.ref("orders");

let items = [];

ref.on("value", function(snapshot) {
    snapshot.forEach(function (childSnapshot) {
      items.push(childSnapshot.val());
  });
});

class RequestsList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      items: items,
      itemsList: null
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(name, markup, price) {
    const table = document.getElementById("list");

    table.onclick = function(event) {
      let target = event.target;
      
      if (target.tagName != "DIV") return;

      uncoverList(target);
    }

    function uncoverList(target) {
      console.log(target.clientHeight);
      if (target.clientHeight != 68) {
        target.classList.add("item_cover");
        target.classList.remove("item_uncover");
      }
      
      else {
        target.classList.add("item_uncover");
        target.classList.remove("item_cover");
      }
    }

  }

  render() {
    setTimeout(() => {
      let newItemsList = this.state.items.map((curr, index) => {
        return <RequestsItem name = {"Продукты"} userName = {curr.name} userSurname = {curr.surname} link = {curr.link} products = {curr.products} markup = {curr.markup} onClick = {this.clickHandler()} building = {curr.building} room = {curr.room} comment = {curr.comment} price = {"100"} key = {index}/>
      });
      this.setState({
        itemsList: newItemsList
      })
    }, 1);
    return (
      <div id = {"list"}>
        <div className = {"listNaming"}>
          <span className = {"listNaming__name"}>Название товаров</span>
          <span className = {"listNaming__price"}>Примерная стоимость</span>
          <span className = {"listNaming__markup"}>Доплата</span>
        </div>
        {this.state.itemsList}
      </div>
    )
  }
}

export default RequestsList;

