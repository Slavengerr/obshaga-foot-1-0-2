import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./less/style.less";
import Header from "./js/components/header/header";
import RequestsList from "./js/components/RequestsList/RequestsList";
import RequestsItem from "./js/components/RequestsItem/RequestsItem";
import CreateRequest from "./js/components/CreateRequest/CreateRequest";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>        
        <Route exact path = "/request" component = {CreateRequest}></Route>
        <Route exact path = "/" component = {RequestsList}></Route>
      </Switch>
    </Router>
  )
}
ReactDOM.render(<App />, document.getElementById("requestsList"));
/** https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%BE-%D0%BE-react-router-%D1%87%D0%B0%D1%81%D1%82%D1%8C-1-%D0%BE%D1%81%D0%BD%D0%BE%D0%B2%D1%8B-%D1%80%D0%BE%D1%83%D1%82%D0%B8%D0%BD%D0%B3%D0%B0-%D1%82%D0%B8%D0%BF%D1%8B-%D0%B8-%D0%B4%D0%B8%D0%BD%D0%B0%D0%BC%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B5-%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D1%8B-1c159cca6fea */