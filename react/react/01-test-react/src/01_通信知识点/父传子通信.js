import React from "react";
class ChildCpn extends React.Component {
  render() {
    const { name, age } = this.props;
    return (
      <div>
        <p>{name}</p>
        <p>{age}</p>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return <ChildCpn name={"张三"} age={44}></ChildCpn>;
  }
}
export default App;
