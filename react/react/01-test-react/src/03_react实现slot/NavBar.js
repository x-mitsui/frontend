import { Component } from "react";

export default class NavBar extends Component {
  render() {
    return (
      <ul className="list">
        {this.props.children.map((item, index) => (
          <li key={index} className="common">
            {item}
          </li>
        ))}
      </ul>
    );
  }
}
