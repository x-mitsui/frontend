const obj1 = {
  name: "张三",
  age: 1,
};
const obj2 = {
  name: "李四",
};
/**
 * 想办法收集
 * 使用obj1.name的functions
 * 使用obj1.age的functions
 * 使用obj2.name的functions
 * 用什么数据结构存储呢？具体分析可以看当前目录下的“关系图.drawio”
 * 用一个weakMap存储各obj对应各键值的使用情况
 */
// 封装依赖方法
class Depends {
  constructor() {
    this.SubScribers = new WeakMap();
  }

  // 往各obj对应的map里加新effect依赖
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
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        // 收集，自动的关键，就是能够拿到使用此数据的function
        // debugger;
        // 这里必须加个判断，因为obj1.name="大猴子"；也会经过这里
        if (curEffect) {
          deps.addEffect(obj, key, curEffect);
        }
        return value;
      },
      set(newValue) {
        // debugger;
        value = newValue;
        deps.notify(obj, key);
      },
    });
  });
}
intercept(obj1);
intercept(obj2);
function test1() {
  console.log("test1-obj1-name:" + obj1.name);
}
function test4() {
  console.log("test4-obj1-name:" + obj1.name);
  console.log("test4-obj2-name:" + obj2.name);
}
function test2() {
  console.log("test2-obj1-age:" + obj1.age);
}
function test3() {
  console.log("test3-obj2-name:" + obj2.name);
}
/*---------------执行区----------------*/

// 此处收集的是对obj1 name和age的引用，
// 甚至test3是不同对象的不同键值，如何区分呢

// 怎么收集呢？在外面收集，每次都需要手动调用deps.addEffect，
// 暂时先将使用test1、test2的地方封装一下，每次使用带响应的函数都得经过我
function run(func) {
  //解决了func的保存问题，但是obj,key的获取怎么办呢？
  // deps.addEffect(obj, "name", func);
  //可以想到劫持的地方那里可以提供, 先把effect设为上层作用域中的引用（run函数和intercept函数共享的位置）
  curEffect = func;
  func();
  curEffect = null;
}
// debugger;
run(test1);
run(test2);
run(test3);
run(test4);
obj1.name = "大猴子";
console.log("============");
obj2.name = "小鸵鸟";
