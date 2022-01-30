enum P_STATE {
  PENDING,
  FULFILLED,
  REJECTED,
}

interface resolveFunc {
  (value: any): void;
}
// 函数的结构定义有一点要注意，函数使用时才会检测是否满足结构定义，函数按结构定义时，只要符合结构要求就可以
type rejectFunc = (reason: any) => void;
type Executor = (resolve: resolveFunc, reject: rejectFunc) => void;

export class TS_Promise<T = any> {
  state: P_STATE;
  value: T = null as unknown as T;
  reason = undefined;
  fulfilledCallbacks: Function[] = [];
  rejectedCallbacks: Function[] = [];

  constructor(executor: Executor) {
    this.state = P_STATE.PENDING;

    const resolve = (value: any) => {
      if (this.state === P_STATE.PENDING) {
        this.state = P_STATE.FULFILLED;
        this.value = value;

        this.fulfilledCallbacks.forEach((fn) => {
          fn();
        });
      }
    };
    const reject = (reason: any) => {
      if (this.state === P_STATE.PENDING) {
        this.state = P_STATE.REJECTED;
        this.reason = reason;

        this.rejectedCallbacks.forEach((fn) => {
          fn();
        });
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(
    onFulfilled: Function = (value: T) => value,
    onRejected: Function = (reason: any) => {
      throw reason;
    }
  ) {
    const p = new TS_Promise<T>((resolve: resolveFunc, reject: rejectFunc) => {
      // console.log("this-:", this);

      if (this.state === P_STATE.FULFILLED) {
        setTimeout(() => {
          try {
            // this.value为上一个promise的value
            const rlt = onFulfilled(this.value);
            settlePromise(resolve, reject, rlt, p);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === P_STATE.REJECTED) {
        setTimeout(() => {
          try {
            const rlt = onRejected(this.reason);
            settlePromise(resolve, reject, rlt, p); //这里不reject，test7测试用例
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.state === P_STATE.PENDING) {
        this.fulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const rlt = onFulfilled(this.value);
              settlePromise(resolve, reject, rlt, p);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.rejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const rlt = onRejected(this.reason);
              settlePromise(resolve, reject, rlt, p);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });
    return p;
  }

  // 其它方法
  static resolve(value: any) {
    return new TS_Promise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason: any) {
    return new TS_Promise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promiseArr: any[]) {
    let count = 0,
      arr: any[] = [];
    return new TS_Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([]);
      } else {
        promiseArr.map((promise, index) => {
          if (isPromise(promise)) {
            promise.then(
              (value: any) => {
                formatArr(index, value, resolve);
              },
              (reason: any) => {
                reject(reason);
              }
            );
          } else {
            formatArr(index, promise, resolve);
          }
        });
      }
    });
    function formatArr(index: number, value: any, resolve: resolveFunc) {
      arr[index] = value;
      count++;
      if (count === promiseArr.length) {
        resolve(arr);
      }
    }
  }
  static allSettled(promiseArr: any[]) {
    let arr: any[] = [],
      count = 0;
    if (!isIterable(promiseArr)) {
      throw new TypeError("allSettled输入参数不可迭代");
    }
    return new TS_Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([]);
      }
      promiseArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(
            (value: any) => {
              formatArr("fulfilled", index, value, resolve);
            },
            (reason: any) => {
              formatArr("rejected", index, reason, resolve);
            }
          );
        } else {
          formatArr("fulfilled", index, promise, resolve);
        }
      });
    });
    function formatArr(state: string, index: number, value: any, resolve: resolveFunc) {
      switch (state) {
        case "fulfilled":
          arr[index] = { value, state };
          break;
        case "rejected":
          arr[index] = {
            reason: value,
            state,
          };
          break;
        default:
          break;
      }
      count++;

      if (count === promiseArr.length) {
        resolve(arr);
      }
    }
  }
  static race(promiseArr: any[]) {
    return new TS_Promise((resolve, reject) => {
      promiseArr.map((promise, index) => {
        if (!isPromise(promise)) {
          resolve(promise);
        }
        promise.then(resolve, reject);
      });
    });
  }
  catch(errorFunc: Function) {
    return this.then(null as unknown as Function, errorFunc);
  }
  /**
   * then().finally(()=>{}).then
   */
  finally(finalFunc: Function) {
    return this.then(
      (value: any) => {
        return TS_Promise.resolve(finalFunc()).then(() => value);
      },
      (reason: any) => {
        return TS_Promise.resolve(finalFunc()).then(() => {
          throw reason;
        });
      }
    );
  }
}

function settlePromise(resolve: resolveFunc, reject: rejectFunc, result: any, p: TS_Promise) {
  if (p === result) {
    throw TypeError("循环引用");
  }
  if (isPromise(result)) {
    result.then(
      (v: any) => {
        settlePromise(resolve, reject, v, p);
        // resolve(v);//如果v还是Promise呢，正好可以用settlePromise处理
      },
      (r: any) => {
        reject(r);
      }
    );
  } else {
    // 只要不是Promise，给什么就往下传递什么
    resolve(result);
  }
}

function isPromise(p: any) {
  return p instanceof TS_Promise;
}

function isIterable(value: any) {
  return value != null && value != undefined && typeof value[Symbol.iterator] === "function";
}
