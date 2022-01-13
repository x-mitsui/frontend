import defineReactiveData from "./reactive.js";
import { arrMethods } from "./array.js";
import observeArr from "./observeArr.js";
export default function Observer(data) {
  if (Array.isArray(data)) {
    Object.setPrototypeOf(data, arrMethods);
    console.log("data--->:", data);
    observeArr(data);
  } else {
    this.walk(data);
  }
}

Observer.prototype.walk = function (data) {
  var keys = Object.keys(data);
  keys.forEach((key) => {
    let value = data[key];
    defineReactiveData(data, key, value);
  });
};
