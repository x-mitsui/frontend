import { REG_ARR, REG_OBJ, REG_SPACE } from "./regular.js";
import { transformToKebab } from "./utils.js";

export function compileAttr(vm, el, name, value) {
  value = value.replace(REG_SPACE, "");
  name = name.replace(":", "");

  vm.$stylePool.set(el, {
    type: name,
    expression: value,
  });
  switch (name) {
    case "class":
      if (REG_OBJ.test(value)) {
        // console.log("Obj:", value);
        const keyValueArr = value.match(REG_OBJ)[1].split(",");
        let classStr = "";

        keyValueArr.forEach((item) => {
          const [key, value] = item.split(":");

          // 判断实例上是否有value
          if (vm[value.trim()]) {
            classStr += ` ${key.trim()}`;
          }
        });
        el.setAttribute("class", classStr.trim());
      } else if (REG_ARR.test(value)) {
        const classArr = renderArr(vm, value);
        el.setAttribute("class", classArr.join(" "));
      }
      break;
    case "style":
      let styleStr = "";
      if (REG_OBJ.test(value)) {
        const styleObj = renderObj(vm, value);

        for (const key in styleObj) {
          styleStr += ` ${transformToKebab(key)}:${styleObj[key]};`;
        }
      } else if (REG_ARR.test(value)) {
        const styleArr = renderArr(vm, value);
        styleArr.forEach((item) => {
          for (let key in item) {
            styleStr += `${transformToKebab(key)}:${item[key]};`;
          }
        });
        console.log("styleStr:", styleStr);
      }
      el.setAttribute("style", styleStr.trim());
      break;
    default:
      break;
  }
}

function renderArr(vm, value) {
  const _arr = new Function(
    "vm", //注意参数要以字符串形式
    `with(vm){
      return ${value} 
    }`
  )(vm);
  return _arr.filter((item) => item);
}

function renderObj(vm, value) {
  return new Function(
    "vm", //注意参数要以字符串形式
    `with(vm){
      return ${value} 
    }`
  )(vm);
}
