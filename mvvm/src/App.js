import { useDom, useReactive } from "./ViewModel/index.js";
// Model层和View层的交流需要通过ViewModel层来协调，它俩不能直接交流
function App() {
  // Model层
  const state = useReactive({
    count: 0,
    name: "Mike",
    friend: {
      name: "李四",
    },
  });
  // console.log(state.friend); // 测试用例0001：如果friend是对象，拿回的是它的代理
  // console.log(state.name); // 测试用例0002
  const add = function (num) {
    state.count += num;
    console.log(state.count);
  };
  const minus = function (num) {
    state.count -= num;
    console.log(state.count);
  };
  const changeName = function (name) {
    state.name = name;
    console.log(state.name);
  };
  return {
    // View层
    template: `
      <h1>{{count}}</h1>
      <h1>{{name}}</h1>
      <button onClick='add(2)'>+</button>
      <button onClick='minus(1)'>-</button>
      <button onClick='changeName("Jack")'>Change Name</button>
    `,
    state,
    methods: {
      add,
      minus,
      changeName,
    },
  };
}

useDom(App(), document.getElementById("app"));
