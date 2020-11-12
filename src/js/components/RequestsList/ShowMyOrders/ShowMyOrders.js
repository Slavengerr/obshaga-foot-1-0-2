import React from "react";
import MyOrder from "../MyOrder/MyOrder";

ShowMyOrders = (props) => {
  let items = props.items;
  let user = auth.currentUser;
  setTimeout(() => {
    let newItemsList = 
                      <div>
                        <h2 className = {"listNaming__myOrders_empty listNaming__myOrders_header"}>Ваш список поданых заявок на доставку пуст.</h2>
                        <button onClick = {() => props.clicker()}>Жми</button>
                        <br />
                        <h3 className = {"listNaming__myOrders_empty listNaming__myOrders_sub"}>Вы можете подать заявку по кнопке "Запросы".</h3>
                      </div>;
    return newItemsList;
  }, 1);
}

export default ShowMyOrders;