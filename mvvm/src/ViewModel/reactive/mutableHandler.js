import { useReactive } from "./index.js";
import { isEqual, isKeyExists, isObject } from "../../shared/utils.js";
import { update } from "../render.js";
import { statesPool } from "../compiler/state.js";

const set = setter;
const get = getter;
function setter(target, key, newValue, receiver) {
  const oldValue = target[key]; //设置之前保存一份
  const isSuccess = Reflect.set(target, key, newValue, receiver);
  // set分为两种情况：一种是新增，一种是更改
  if (!isKeyExists(target, key)) {
    console.log("新增属性");
  } else if (!isEqual(oldValue, newValue)) {
    console.log("修改属性");
    update(statesPool, key, newValue);
  }
  return isSuccess;
}
// 实现get代理，默认情况是递归代理或者叫深度代理
function getter(target, key, receiver) {
  console.log(target, key, receiver);
  const res = Reflect.get(target, key, receiver);
  console.log("代理get成功");
  if (isObject(res)) {
    // 对应测试用例0001
    return useReactive(res);
  }
  return res; // 对应测试用例0002
}

export const mutableHandler = { get, set };
