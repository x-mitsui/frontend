const obj1 = {
  name: "张三",
  age: 1,
};
const obj2 = {
  name: "李四",
};
/**
 * 使用代理方式
 */

class Depends {
  constructor() {
    this.SubScribers = new WeakMap();
  }

  addEffect(obj, key, func) {
    // debugger;
    if (this.SubScribers.has(obj)) {
      const keysObj = this.SubScribers.get(obj);
      if (!keysObj.hasOwnProperty(key)) {
        keysObj[key] = [];
      }
      keysObj[key].push(func);
    } else {
      const keysObj = {};
      keysObj[key] = [func];

      this.SubScribers.set(obj, keysObj);
    }
  }

  notify(obj, key) {
    console.log(this.SubScribers.get(obj));
    this.SubScribers.get(obj)[key].forEach((effect) => {
      effect();
    });
  }
}
const deps = new Depends();
let curEffect = null;

function intercept(obj) {
  return new Proxy(obj, {
    // 之前vue2，如果obj新增一个属性，还需要在对这个新增属性进行defineProperty
    // 而Proxy劫持的是整个对象，所以不需要额外做特殊处理了
    // 另外触发的拦截不同，vue2修改对象的触发
    // 另外触发的拦截不同，vue3修改Proxy实例触发
    // 而且Proxy捕获器更丰富
    get(target, key) {
      // debugger;
      if (curEffect) {
        deps.addEffect(obj, key, curEffect);
      }
      return Reflect.get(target, key);
    },
    set(target, key, newValue) {
      // debugger;
      Reflect.set(target, key, newValue);
      deps.notify(obj, key);
    },
  });
}
const pObj1 = intercept(obj1);
const pObj2 = intercept(obj2);
function test1() {
  console.log("test1-obj1-name:" + pObj1.name);
}
function test4() {
  console.log("test4-obj1-name:" + pObj1.name);
  console.log("test4-obj2-name:" + pObj2.name);
}
function test2() {
  console.log("test2-obj1-age:" + pObj1.age);
}
function test3() {
  console.log("test3-obj2-name:" + pObj2.name);
}
/*---------------执行区----------------*/

function run(func) {
  curEffect = func;
  func();
  curEffect = null;
}
// debugger;
run(test1);
run(test2);
run(test3);
run(test4);
console.log("============");
pObj1.name = "大猴子";
console.log("============");
pObj2.name = "小鸵鸟";
