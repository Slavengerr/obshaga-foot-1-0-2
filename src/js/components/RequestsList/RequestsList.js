import React from "react";
import "./RequestsList.less";
import RequestsItem from "../RequestsItem/RequestsItem";

class RequestsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {name:"Творог", price: "90", markup: "Да"},
        {name:"Творог", price: "90", markup: "Да"},
        {name:"Творог", price: "90", markup: "Да"},
        {name:"Творог", price: "90", markup: "Да"},
        {name:"Творог", price: "90", markup: "Да"},
        {name:"Творог", price: "90", markup: "Да"},
        {name:"Творог, сыр, кефир, алыча, хлеб, зерна лука, петрушка, уксус, сода, овсянка, вода, минералка, газировка, пиво, водка.", price: "90", markup: "Да"}
      ]
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
    const items = this.state.items.map((curr, index) => {
                    return <RequestsItem name = {curr.name} clickHandler = {(() => this.clickHandler(curr.name, curr.markup, curr.price))} markup = {curr.markup} price = {curr.price} key = {index}/>
                  });
    return (
      <>
        <div className = {"listNaming"}>
          <span className = {"listNaming__name"}>Название товаров</span>
          <span className = {"listNaming__price"}>Примерная стоимость</span>
          <span className = {"listNaming__markup"}>Доплата</span>
        </div>
        <div id = {"list"}className = {"list"}>
          {items}
        </div>
      </>
    )
  }
}

export default RequestsList;