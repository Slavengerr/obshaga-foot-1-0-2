import React from "react";
import "./RequestsList.less";
import RequestsItem from "./RequestsItem/RequestsItem";
import MyOrder from "./MyOrder/MyOrder";
import TakenOrder from "./TakenOrder/TakenOrder";
import ShowAllButton from "./OrdersButtons/ShowAllButton";
import ShowTakenButton from "./OrdersButtons/ShowTakenButton";
import ShowMyButton from "./OrdersButtons/ShowMyButton";
import {NavLink, Route, BrowserRouter as Router} from "react-router-dom";
import { auth, database } from "../../firebase";

let ref = database.ref("orders"),
    addRef = database.ref("takenOrders"),
    userOrders;

let items = [],
    currentUser,
    session,
    takenOrders = [],
    usersOrdersList = [];
     

auth.onAuthStateChanged(function(user) {
  if (user) {
    currentUser = user;
    userOrders = database.ref("users/" + user.uid + "/takenOrders");
    console.log("Сделал юзеру");
  } 
  else {
    window.vkAsyncInit = function() {
      VK.init({
        apiId: 7649501
      });
      VK.Auth.login(function(response) {
        session = response.session;   
      });
    }
    auth.createUserWithEmailAndPassword("vk" + session.mid*8 + "@gmail.com", session.mid*2 + "")
      .then(u => {})
      .catch(error => {
        switch (error.code) {
          case "auth/email-already-in-use":
            auth.signInWithEmailAndPassword("vk" + session.mid*8 + "@gmail.com", session.mid*2 + "");
            break;
      }   
    })
    setTimeout(function() {
      var el = document.createElement("script");
      el.type = "text/javascript";
      el.src = "https://vk.com/js/api/openapi.js?168";
      el.async = true;
      document.getElementById("vk_api_transport").appendChild(el);
    }, 0);
  }
});

class RequestsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      content: '',
      readError: null,
      writeError: null
    }


    this.clickHandler = this.clickHandler.bind(this);
  }

  async componentDidMount() {
    this.setState({ 
      readError: null,
      user: auth.currentUser,
      usersOrdersList: []
   });
    try {
      ref.on("value", snapshot => {
        let items = [];
        snapshot.forEach((snap) => {
          items.push(snap.val());
        });
        this.setState({ items });
      });
      addRef.on("value", snapshot => {
        takenOrders = [];
        snapshot.forEach((snap) => {
          takenOrders = snap.val();
        });
        this.setState({takenOrders}) /** ЗДЕСЬ ПОСМОТРИ ЧТО ЗА ХУЙНЯ БЫЛА. */
      });
      console.log("здесь");
      console.log(auth.currentUser);
      setTimeout(() => {
        userOrders.on("value", snapshot => {
          let usersOrdersList;
          snapshot.forEach((snap) => {
            usersOrdersList = snap.val();
          });
          this.setState({usersOrdersList}); /** ЗДЕСЬ ПОСМОТРИ ЧТО ЗА ХУЙНЯ БЫЛА. */
        });
      }, 5000);
    } 
    catch (error) {
      this.setState({ readError: error.message });
    }
  }

  clickHandler = () => {
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
    let newItems = this.state.items == 0 ? null : this.state.items;
    return (
      <div id = {"list"}>
        <div id = "vk_api_transport"></div>
        <div className = {"listNaming__buttons"}>
          <NavLink to = "/all_orders" activeClassName = {"listNaming__button_active"} className = {"listNaming__button"}>Все заказы</NavLink>
          <NavLink to = "/my_orders" activeClassName = {"listNaming__button_active"} className = {"listNaming__button"}>Мои заказы</NavLink>
          <NavLink to = "/taken_orders" activeClassName = {"listNaming__button_active"} className = {"listNaming__button"}>Взятые мной</NavLink>
        </div>
        <div className = {"listNaming"}>
          <span className = {"listNaming__name"}>Название товаров</span>
          <span className = {"listNaming__price"}>Примерная стоимость</span>
          <span className = {"listNaming__markup"}>Доплата</span>
        </div>
        {newItems ? 
          <Route path = "/all_orders" render = {
            () => {
            return newItems.map((curr, index) => {
              if (currentUser.uid != curr.uid && !takenOrders.includes(curr.id)) {
                return <RequestsItem {...curr} onClick = {this.clickHandler()} key = {index}/>}})
            }}>            
          </Route> : null}
          {newItems ? 
          <Route path = "/my_orders" render = {
            () => {
              return newItems.map((curr, index) => {
                if (currentUser.uid == curr.uid) {
                  return <MyOrder {...curr} onClick = {this.clickHandler()} key = {index}></MyOrder>
                }
              })
            }}>            
          </Route> : null}
          {newItems ? 
          <Route path = "/taken_orders" render = {
            () => {
              return newItems.map((curr, index) => {
                if (this.state.usersOrdersList.includes(curr.id)) {
                  return <TakenOrder {...curr} onClick = {this.clickHandler()} key = {index}></TakenOrder>
                }
              })
            }}>            
          </Route> : null}
      </div>
    )
  }
}

export default RequestsList;

