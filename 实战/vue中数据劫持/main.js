/**
 * 数组变更的检测
 */
var vm = {
  data: {
    a: 1,
    b: 2,
    list: [1, 2, 3, 4, 5],
  },
};

for (var key in vm.data) {
  (function (key) {
    Object.defineProperty(vm, key, {
      get() {
        return vm.data[key];
      },
      set(newValue) {
        vm.data[key] = newValue;
      },
    });
  })(key);
}
// 以下方法都不返回新数组且Object.defineProperty没办法监听下列方法对数组的操作变更
// 那么怎么实现对这些方法的监听呢
// vm.list.push(6);
// vm.list.pop();
// vm.list.shift();
// vm.list.splice(2, 1);
// vm.list.sort((a, b) => b - a);
// vm.list.reverse();

// 有些数组方法会返回新的数组，这样就可以用于替换原数组，这样可以用Object.defineProperty监听
// vm.list=vm.list.slice(1)
// console.log("vm.list:", vm.list);
// console.log("vm:", vm);
