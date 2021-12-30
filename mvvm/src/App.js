import { useDom, useReactive } from "./ViewModel/index.js";
// Model层和View层的交流需要通过ViewModel层来协调，它俩不能直接交流
function App() {
  // Model层
  const state = useReactive({
    count: 0,
    name: "Mike",
  });
  const add = function (num) {
    state.count += num;
  };
  const minus = function (num) {
    state.count -= num;
  };
  const changeName = function (name) {
    state.name = name;
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
