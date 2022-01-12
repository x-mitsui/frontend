export class Computed {
  constructor() {
    this.ComputedData = [];
  }

  addComputed(vm, computed, key) {
    const descriptor = Object.getOwnPropertyDescriptor(computed, key);
    console.log("descriptor:", descriptor);
    const descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value;
    const value = descriptorFn.call(vm);
    const get = descriptorFn.bind(vm);
    const dependence = this._collectDependence(descriptorFn);

    this._addComputedProp({
      key,
      value,
      get,
      dependence,
    });

    const dataItem = this.ComputedData.find((item) => item.key === key);

    Object.defineProperty(vm, key, {
      get() {
        return dataItem.value;
      },
      set(newValue) {
        dataItem.value = dataItem.get();
      },
    });
  }
  _addComputedProp(computedProp) {
    this.ComputedData.push(computedProp);
  }
  _collectDependence(fn) {
    const regExp = /this\..+?/g;
    const matched = fn.toString().match(regExp);
    return matched.map((item) => item.split(".")[1]);
  }
  update(key, watch) {
    this.ComputedData.map((item) => {
      const dep = item.dependence;
      const _key = dep.find((el) => el == key);
      if (_key) {
        const oldValue = item.value;
        item.value = item.get();
        watch(item.key, item.value, oldValue);
      }
    });
  }
}
