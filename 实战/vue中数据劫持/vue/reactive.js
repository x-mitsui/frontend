import { observe } from "./observe.js";

export default function defineReactiveData(data, key, value) {
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      console.log("响应式数据 获取：", value);
      return value;
    },
    set(newValue) {
      console.log("响应式数据 设置：", newValue);
      if (newValue === value) return;
      observe(newValue);
      value = newValue;
    },
  });
}
