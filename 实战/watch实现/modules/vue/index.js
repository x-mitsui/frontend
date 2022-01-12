/**
 * 需求：
 * data属性挂载到实例上，且实现响应式：
 * {
 *    即 get vm[key] ->vm.$data[key]
 *
 *    另即 set vm[key] ->vm.$data[key] = newValue
 *    且执行 update Computed 各prop的fn 和 update Watch prop的fn
 * }
 *
 * 其中 computed的各prop对应的是fn，各prop结构
 * {
 *    value: fn执行的结果
 *    get：fn或者对应的get
 *    dep：依赖的data属性
 * }
 *
 * watch中各props对应的为fn
 *
 */

import { reactive } from "./reactive.js";
import { Computed } from "./computed.js";
import { Watcher } from "./watcher.js";

class Vue {
  constructor(opts) {
    const { data, computed, watch } = opts;
    this.$data = data();

    // 处理computed和watch
    this.init(this, computed, watch);
  }
  init(vm, computed, watch) {
    this.initData(vm);
    const computedInstance = this.initComputed(vm, computed);
    const watchInstance = this.initWatcher(vm, watch);
    this.$computed = computedInstance.update.bind(computedInstance);
    this.$watch = watchInstance.invoke.bind(watchInstance);
  }
  initData(vm) {
    reactive(
      vm,
      (key, value) => {
        // console.log("kk", key, value);
      },
      (key, oldValue, newValue) => {
        if (newValue === oldValue) {
          return;
        }
        // console.log(key, oldValue, newValue);
        this.$computed(key, this.$watch);
        this.$watch(key, newValue, oldValue);
      }
    );
  }
  initComputed(vm, computed) {
    const computedInstance = new Computed();
    for (let key in computed) {
      computedInstance.addComputed(vm, computed, key);
    }

    return computedInstance;
  }
  initWatcher(vm, watch) {
    const watchInstance = new Watcher();
    for (const key in watch) {
      if (Object.hasOwnProperty.call(watch, key)) {
        watchInstance.addWatcher(vm, watch, key);
      }
    }
    return watchInstance;
  }
}

export default Vue;
