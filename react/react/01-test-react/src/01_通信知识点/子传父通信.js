import { Component } from "react";
// 子传父
class ChildBtn extends Component {
  render() {
    const { parentClick } = this.props;
    return <button onClick={parentClick}>改变</button>;
  }
}
///////
class App extends Component {
  state = {
    counter: 0,
  };
  render() {
    return (
      <div>
        <h2>{this.state.counter}</h2>
        <ChildBtn
          parentClick={(e) => {
            this.parentClick();
          }}
        ></ChildBtn>
      </div>
    );
  }
  parentClick() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }
}

export default App;
