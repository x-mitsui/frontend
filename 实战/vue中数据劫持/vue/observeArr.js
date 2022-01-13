import { observe } from "./observe.js";

export default function observeArr(arr) {
  arr.forEach((item) => {
    observe(item);
  });
}
