import React, {Component} from "react";
import "./LoginPage.less";
import { auth, database } from "../../firebase";

let ref = database.ref(),
    session;

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

setTimeout(function() {
  var el = document.createElement("script");
  el.type = "text/javascript";
  el.src = "https://vk.com/js/api/openapi.js?168";
  el.async = true;
  document.getElementById("vk_api_transport").appendChild(el);
}, 0);

export class LoginPage extends Component {
  render() {
    return(
      <>
        <div id="vk_api_transport"></div>
      </>
    ) 
  }
}
