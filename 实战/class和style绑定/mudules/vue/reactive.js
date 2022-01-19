import { attrUpdate } from "./attrUpdate.js";

export function reactive(vm, target) {
  Object.keys(target).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return target[key];
      },
      set(newValue) {
        if (target[key] === newValue) return;
        target[key] = newValue;
        attrUpdate(vm, key);
      },
    });
  });
}
