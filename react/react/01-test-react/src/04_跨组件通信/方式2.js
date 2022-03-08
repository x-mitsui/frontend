import React, { Component } from "react";
// 创建context对象
const UserContext = React.createContext({
  nickname: "昵称默认值",
  job: "工作默认值",
});
class ProfileHeader extends Component {
  render() {
    const { nickname, job } = this.context;
    return (
      <div>
        <h2>{nickname}</h2>
        <p>{job}</p>
      </div>
    );
  }
}
ProfileHeader.contextType = UserContext;
function Profile(props) {
  return (
    <div>
      <ProfileHeader></ProfileHeader>
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
    return (
      <UserContext.Provider value={this.state}>
        <Profile></Profile>
      </UserContext.Provider>
    );
  }
}
