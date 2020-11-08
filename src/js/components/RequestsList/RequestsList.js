import React from "react";
import "./RequestsList.less";
import RequestsItem from "../RequestsItem/RequestsItem";
import { auth, database } from "../../firebase";

let ref = database.ref("orders");

let items = [],
    session,
    takenOrders,
    addRef = database.ref("takenOrders");

ref.on("value", function(snapshot) {
    snapshot.forEach(function (childSnapshot) {
      items.push(childSnapshot.val());
  });
});

window.vkAsyncInit = function() {
  VK.init({
    apiId: 7649501
  });
  VK.Auth.login(function(response) {
    session = response.session;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        
      } 
      else {
        auth.createUserWithEmailAndPassword("vk" + session.mid*8 + "@gmail.com", session.mid*2 + "")
          .then(u => {})
          .catch(error => {
            switch (error.code) {
              case "auth/email-already-in-use":
                auth.signInWithEmailAndPassword("vk" + session.mid*8 + "@gmail.com", session.mid*2 + "");
                break;
            }   
          })
        }
      });
    });
}

addRef.on("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    takenOrders = childSnapshot.val();
  });
})

setTimeout(function() {
  var el = document.createElement("script");
  el.type = "text/javascript";
  el.src = "https://vk.com/js/api/openapi.js?168";
  el.async = true;
  document.getElementById("vk_api_transport").appendChild(el);
}, 0);

class RequestsList extends React.Component {
  constructor(props) {

    super(props);

    this.state = {
      items: items,
      itemsList: null,
    }

    this.clickHandler = this.clickHandler.bind(this);
  }

  showAllOrders = () => {
    this.setState({itemsList: null});
    let user = auth.currentUser,
        userRef = database.ref(`users/${user.uid}`),
        userTakenOrders = [];
    setTimeout(() => {
      userRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          userTakenOrders = childSnapshot.val();
        });
      });
    }, 0);

    setTimeout(() => {
      let newItemsList = this.state.items.map((curr, index) => {
          return (userTakenOrders.includes(curr.id)) ?
            null
            :
            <RequestsItem name = {"Продукты"} orderID = {curr.id} userName = {curr.name} userSurname = {curr.surname} link = {curr.link} products = {curr.products} markup = {curr.markup} onClick = {this.clickHandler()} building = {curr.building} room = {curr.room} comment = {curr.comment} price = {"100"} key = {index}/>
        });        
      this.setState({
        itemsList: newItemsList
      })
    }, 1);  
  }

  showMyOrders = () => {
    this.setState({itemsList: null});
    let user = auth.currentUser;
    setTimeout(() => {
      let newItemsList = this.state.items.map((curr, index) => {
        return (user.uid == curr.uid) ?
          <RequestsItem name = {"Продукты"} userName = {curr.name} userSurname = {curr.surname} link = {curr.link} products = {curr.products} markup = {curr.markup} onClick = {this.clickHandler()} building = {curr.building} room = {curr.room} comment = {curr.comment} price = {"100"} key = {index}/>
          :
          null
      });
      this.setState({
        itemsList: newItemsList
      })
    }, 1);
  }

  showTakenOrders = () => {
    setTimeout(() => {
      let newItemsList = this.state.items.map((curr, index) => {
        return (takenOrders.includes(curr.id)) ? 
          <RequestsItem name = {"Продукты"} userName = {curr.name} userSurname = {curr.surname} link = {curr.link} products = {curr.products} markup = {curr.markup} onClick = {this.clickHandler()} building = {curr.building} room = {curr.room} comment = {curr.comment} price = {"100"} key = {index}/>
          :
          null
      });
      this.setState({
        itemsList: newItemsList
      })
    }, 1);
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
    return (
      <div id = {"list"}>
        <div id = "vk_api_transport"></div>
        <div className = {"listNaming__buttons"}>
          <button onClick = {this.showAllOrders} className = {"listNaming__button"}>Все заявки</button>
          <button onClick = {this.showMyOrders} className = {"listNaming__button"}>Мои заявки</button>
          <button onClick = {this.showTakenOrders} className = {"listNaming__button"}>Взятые мной</button>
        </div>
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

