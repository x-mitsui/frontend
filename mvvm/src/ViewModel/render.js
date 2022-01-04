import { bindEvent } from "./compiler/event.js";
import { eventFormat, stateFormat } from "./index.js";
export function useDom({ template, state, methods }, rootDOM) {
  console.log(template, state, methods, rootDOM);
  rootDOM.innerHTML = render(template, state);
  bindEvent(methods);
}

export function render(template, state) {
  template = eventFormat(template);
  template = stateFormat(template, state);
  return template;
}
