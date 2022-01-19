export function transformToKebab(key) {
  return key.replace(/([A-Z])/g, function (node, key) {
    return "-" + key.toLowerCase();
  });
}

export function isObject(target) {
  return Object.prototype.toString.call(target) === "[object Object]";
}
