import Observer from "./observer.js";
export function observe(data) {
  if (typeof data != "object" || data === null) {
    return;
  }

  return new Observer(data);
}
