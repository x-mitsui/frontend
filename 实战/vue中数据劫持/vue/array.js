import { ARR_METHODS } from "./config.js";
import observeArr from "./observeArr.js";
var originArrMethods = Array.prototype;
const arrMethods = Object.create(originArrMethods);
ARR_METHODS.map((m) => {
  arrMethods[m] = function () {
    var args = Array.prototype.slice.call(arguments);
    var rt = originArrMethods[m].apply(this, args);

    var newArr; //新增的数组
    switch (m) {
      case "push":
      case "unshift":
        newArr = args;
        break;
      case "splice":
        newArr = args.slice(2); //第三个参数以及之后可为对象，数组或若干原始值
        break;
      default:
        break;
    }
    newArr && observeArr(newArr);
    return rt;
  };
});

export { arrMethods };
