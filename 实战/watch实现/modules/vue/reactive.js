//在响应式基础上添加回调
export function reactive(vm, __get__, __set__) {
  const _data = vm.$data;
  Object.keys(_data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        __get__(key, _data[key]);
        return _data[key];
      },
      set(newValue) {
        const oldeValue = _data[key];
        _data[key] = newValue;
        __set__(key, oldeValue, newValue);
      },
    });
  });
}
