import { Component } from "react";

export default class TabControl extends Component {
  state = {
    clickedBtnIndex: 0,
  };
  render() {
    return <ul className="list">{this.getList()}</ul>;
  }
  getList() {
    const { list, sendMes } = this.props;

    return list.map((item, index) => {
      return (
        <li key={index}>
          <button
            onClick={(e) => {
              sendMes(e, index);
              this.setState({
                clickedBtnIndex: index,
              });
            }}
            className={this.state.clickedBtnIndex === index ? "active" : undefined}
          >
            {item}
          </button>
        </li>
      );
    });
  }
}
