import { Component } from "react";
import NavBar from "./NavBar";
import NavBar02 from "./NavBar02";
import "./index.css";
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar>
          <a href="/#">链接</a>
          <span>aaa</span>
          <strong>bbb</strong>
        </NavBar>
        <NavBar02
          left={<a href="/#">链接2</a>}
          center={<span>ccc</span>}
          right={<strong>ddd</strong>}
        ></NavBar02>
      </div>
    );
  }
}
