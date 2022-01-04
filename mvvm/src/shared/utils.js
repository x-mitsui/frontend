export function isObject(target) {
  return typeof target === "object" && target != null;
}

export function isKeyExists(target, key) {
  // 使用Object.prototype.hasOwnProperty.call，这样target为数组也能使用
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function isEqual(A, B) {
  return A === B;
}

export function getRandomNum() {
  return new Date().getTime() + parseInt(Math.random() * 10000);
}
// 处理参数为字符串、布尔值和数字
// 暂未考虑对象、数组、函数等等
export function formatArg(str) {
  console.log("origin:", str);
  // 先剥离小括号
  str = str.replace(/\((.*?)\)/g, "$1");
  // 检测参数是否带双引号和单引号
  const strRegExp = /(\"|\')([^\1]*?)\1/g;
  if (strRegExp.test(str)) {
    return str.replace(/(\"|\')/g, "");
  }
  if (str === "true") {
    return true;
  } else if (str === "false") {
    return false;
  }

  return Number(str);
}
