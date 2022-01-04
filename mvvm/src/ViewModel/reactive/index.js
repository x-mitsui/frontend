import { isObject } from "../../shared/utils.js";
import { mutableHandler as baseHandler } from "./mutableHandler.js";
export function useReactive(target) {
  return createReactiveObject(target, baseHandler);
}

function createReactiveObject(target, baseHandler) {
  if (!isObject(target)) {
    return target;
  }

  const targetProxy = new Proxy(target, baseHandler);
  return targetProxy;
}
