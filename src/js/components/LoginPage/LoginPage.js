import React, {Component} from "react";
import "./LoginPage.less";
import { Helmet } from "react-helmet";

class LoginPage extends Component {
  componentDidMount() {
    window.vkAsyncInit = function() {
      VK.init({
        apiId: 7649501
      });
      VK.Auth.login(function(response) {
        console.log(response.session);
        console.log(response.status);
      });
    }

    setTimeout(function() {
      var el = document.createElement("script");
      el.type = "text/javascript";
      el.src = "https://vk.com/js/api/openapi.js?168";
      el.async = true;
      document.getElementById("vk_api_transport").appendChild(el);
    }, 0);
  }
  render() {
    return(
      <>
        <div id="vk_auth"></div>
        <div id="vk_api_transport"></div>
      </>
    ) 
  }
}

export default LoginPage;

