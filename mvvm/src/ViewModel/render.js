import { bindEvent } from "./compiler/event.js";
import { eventFormat, stateFormat } from "./index.js";
export function useDom({ template, state, methods }, rootDOM) {
  console.log(template, state, methods, rootDOM);
  rootDOM.innerHTML = render(template, state);
  bindEvent(methods);
}
// 渲染
export function render(template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);
  return template;
}

// 更新
export function update(statesPool, key, value) {
  const allEls = document.querySelectorAll("*");
  console.log("sh");
  statesPool.forEach((stateObj) => {
    if (stateObj.state[stateObj.state.length - 1] === key) {
      allEls.forEach((el) => {
        if (parseInt(el.dataset.mark) === stateObj.mark) {
          el.innerHTML = value;
        }
      });
    }
  });
}
