import { getRandomNum } from "../../shared/utils.js";
/**
 * 本模块目的：
 * 1. 给相应标签打标记
 * 2. 让标签显示相应信息
 */
const reg_html = /<(.+?)>\{\{(.*?)\}\}<\/\1>/g;
const reg_data = /\{\{(.*?)\}\}/g;

// 用于更新
export const statesPool = [];

let ptr = 0;
export function stateFormat(template, state) {
  template = template.replace(reg_html, function (matchNode, _1, _2) {
    console.log(matchNode, _1, _2);
    const mark = getRandomNum();
    statesPool.push({
      mark,
    });
    return `<${_1} data-mark='${mark}'>{{${_2}}} </${_1}>`;
  });

  template = template.replace(reg_data, function (matchNode, _1) {
    const strArr = _1.split(".");
    statesPool[ptr].state = strArr;
    ptr++;

    let replaceStr = "";
    for (let i = 0; i < strArr.length; i++) {
      replaceStr = state[strArr[i]];
    }
    return replaceStr;
  });
  console.log(statesPool);
  return template;
}
