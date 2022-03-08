import React, { Component } from "react";
// 创建context对象
const UserContext = React.createContext({
  nickname: "昵称默认值",
  job: "工作默认值",
});
const AgeContext = React.createContext({
  age: 18,
});
// 真实开发不这样写了。。。
function ProfileHeader() {
  return (
    <UserContext.Consumer>
      {(value) => (
        <AgeContext.Consumer>
          {(data) => (
            <div>
              <h2>{value.nickname}</h2>
              <p>{value.job}</p>
              <p>{data.age}</p>
            </div>
          )}
        </AgeContext.Consumer>
      )}
    </UserContext.Consumer>
  );
}

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
        <AgeContext.Provider value={{ age: 29 }}>
          <Profile></Profile>
        </AgeContext.Provider>
      </UserContext.Provider>
    );
  }
}
