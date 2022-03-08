import { Component } from "react";

class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.nickname}</h2>
        <p>{this.props.job}</p>
      </div>
    );
  }
}
function Profile(props) {
  return (
    <div>
      <ProfileHeader {...props}></ProfileHeader>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
}
export default class App extends Component {
  state = {
    nickname: "张三",
    job: "犯罪",
  };

  render() {
    return <Profile {...this.state}></Profile>;
  }
}
