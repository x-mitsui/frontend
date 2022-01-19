import { observe } from "./observe.js";
import proxyData from "./proxyData.js";

export function initState(vm) {
  var options = vm.$options;
  if (options.data) {
    initData(vm);
  }
}

function initData(vm) {
  var data = vm.$options.data;
  console.log("data()", data());
  console.log("data.call(vm):", data.call(vm));
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};

  // 将data数据劫持到vm上
  for (let key in data) {
    proxyData(vm, "_data", key);
  }

  // 对vm._data内部数据进行观察，嵌套观察
  observe(vm._data);
}
