import React, {Component} from "react";
import {NavLink, BrowserRouter as Router} from "react-router-dom";

class TestMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [1, 2, 3]
    }
  }

  clickHandler = () => {
    let kek = this.state.items.slice();
    kek.push(kek[kek.length-1]+1);
    this.setState({
      items: kek
    })
  }

  render() {
    let items = this.state.items.map((curr) => {
      return( 
        <div>
          <h1>{curr}</h1>
          <button onClick = {this.clickHandler}>Plusss</button>
        </div>
      )
    });
    return(
      <div>
      {items}  
      </div>
      
    )
  }
}

export default TestMain;