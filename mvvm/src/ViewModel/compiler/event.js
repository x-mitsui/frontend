import { formatArg, getRandomNum } from "../../shared/utils.js";

// 开始竟然用成了\w...
const regEx_onClick = /onClick\=(\'|\")(.+?)\1/g;
const regEx_method = /(.+?)\(/g;
const regEx_arg = /\((.*?)\)/g;
/**
 * mark: 此dom唯一标识
 * handler: 事件处理函数的字符串
 * type: 类型
 */
const eventsPool = [];
export function eventFormat(template) {
  return template.replace(regEx_onClick, function (matchNode, $1, $2) {
    console.log(matchNode, $1, $2);
    const mark = getRandomNum();
    eventsPool.push({
      mark,
      handler: $2.trim(),
      type: "click",
    });
    return `data-mark="${mark}"`;
  });
}

export function bindEvent(methods) {
  const allEles = document.querySelectorAll("*");
  eventsPool.forEach((event) => {
    allEles.forEach((el) => {
      const dataMark = parseInt(el.dataset.mark);
      if (dataMark === event.mark) {
        const fnName = event.handler.match(regEx_method)[0].replace("(", "");
        const fnArg = formatArg(event.handler.match(regEx_arg)[0]);
        el.addEventListener(event.type, (evt) => {
          methods[fnName](fnArg);
        });
      }
    });
  });
}
