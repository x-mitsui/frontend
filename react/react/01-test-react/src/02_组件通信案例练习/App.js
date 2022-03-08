import { Component } from "react";
import TabControl from "./TabControl";
import "./index.css";
export default class App extends Component {
  list = ["流行", "新歌", "精选"];
  state = {
    index: 0,
  };
  render() {
    return (
      <div className="container">
        <TabControl
          list={this.list}
          sendMes={(e, index) => {
            this.changeContent(index);
          }}
        ></TabControl>
        <h2>{this.list[this.state.index]}</h2>
      </div>
    );
  }
  // componentDidMount() {
  //   this.changeContent(0);
  // }
  changeContent(index) {
    this.setState({ index });
  }
}
