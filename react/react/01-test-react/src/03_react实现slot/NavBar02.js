import { Component } from "react";

export default class NavBar02 extends Component {
  render() {
    const { left, center, right } = this.props;
    return (
      <ul className="list">
        <li className="common">{left}</li>
        <li className="common">{center}</li>
        <li className="common">{right}</li>
      </ul>
    );
  }
}
