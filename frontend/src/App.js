import request from "superagent";
import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    request.get("http://localhost:3000/fetchAll").then((data) => {
      this.setState({ list: data.body });
    });
  }

  handleClick = async () => {
    let userBox = document.getElementById("username");
    let passBox = document.getElementById("password");
    userBox = userBox.value;
    passBox = passBox.value;
    await request.post(`http://localhost:3000/user/${userBox}/${passBox}`);
    request.get("http://localhost:3000/fetchAll").then((data) => {
      this.setState({ list: data.body });
    });
  };
  render() {
    let { list } = this.state;
    return (
      <React.Fragment>
        <div className="App">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
          />
          <br />
          <input type="text" id="password" name="password" placeholder="age" />
          <br />
          <button onClick={this.handleClick}>Submit</button>
        </div>
        {list.map((element) => {
          return (
            <div>
              <span>{element.name} </span>
              <span>{element.age}</span>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default App;
