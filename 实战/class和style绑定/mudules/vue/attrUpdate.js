import { compileAttr } from "./compile.js";

export function attrUpdate(vm, key) {
  console.log("11:", 11);
  const _stylePool = vm.$stylePool;

  for (let [k, v] of _stylePool) {
    console.log("keyvalue:", k, v);
    if (v.expression.indexOf(key) !== -1) {
      compileAttr(vm, k, v.type, v.expression);
    }
  }
}
