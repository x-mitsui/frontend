const PENDING = 'pending',
  FULFILLED = 'Fulfilled',
  REJECTED = 'Rejected'

class _Promise {
  constructor(executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (value instanceof _Promise) {
        value.then(resolve, reject)
        return
      }
      if (this.status === PENDING) {
        this.value = value

        this.status = FULFILLED

        this.onFulfilledCallbacks.forEach((fulcal) => fulcal())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED

        this.onRejectedCallbacks.forEach((rejcal) => rejcal())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          }
    let promise2 = new _Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)

            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }

  catch(errorCallback) {
    return this.then(null, errorCallback)
  }

  // finally是一个特殊的then【下面有辅助理解：t1】
  // 对应文末finally特点整理需求
  // 如果此then的主Promise对象失败，那么就传递主Promise对象的reason；
  // 如果主Promise对象和finallyCallback内都成功就返回主Promise对象的value；
  // 如果finallyCallback内部失败就返回finallyCallback内部失败的reason
  finally(finallyCallback) {
    return this.then(
      (value) => {
        return _Promise.resolve(finallyCallback()).then(() => value)
      },
      (reason) => {
        return _Promise.resolve(finallyCallback()).then(() => {
          throw reason
        })
      }
    )
  }

  static resolve(value) {
    return new _Promise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(error) {
    return new _Promise((resolve, reject) => {
      reject(error)
    })
  }

  static all(promiseArr) {
    let resArr = [],
      idx = 0
    return new _Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([])
      }
      promiseArr.map((promise, index) => {
        if (isPromise(promise)) {
          promise.then((res) => {
            formatResArr(res, index, resolve)
          }, reject)
        } else {
          formatResArr(promise, index, resolve)
        }
      })
    })

    function formatResArr(value, index, resolve) {
      resArr[index] = value
      if (promiseArr.length === ++idx) {
        //不要用resArr.length和promiseArr.length比较，因为resArr=[,,1]，它的length===3
        resolve(resArr)
      }
    }
  }

  static allSettled(promiseArr) {
    let resArr = [],
      idx = 0

    if (!isIterable(promiseArr)) {
      throw new TypeError('MyError--allSettled参数不可迭代')
    }

    return new _Promise((resolve, reject) => {
      if (promiseArr.length === 0) {
        resolve([])
      }
      promiseArr.map((promise, index) => {
        if (isPromise(promise)) {
          promise.then(
            (value) => {
              formatResArr('fulfilled', value, index, resolve)
            },
            (reason) => {
              formatResArr('rejected', reason, index, resolve)
            }
          )
        } else {
          formatResArr('fulfilled', promise, index, resolve)
        }
      })
    })
    function formatResArr(status, value, index, resolve) {
      switch (status) {
        case 'fulfilled':
          resArr[index] = {
            status,
            value,
          }
          break
        case 'rejected':
          resArr[index] = {
            status,
            reason: value,
          }
          break
        default:
          break
      }
      if (++idx === promiseArr.length) {
        resolve(resArr)
      }
    }
  }

  static race(promiseArr) {
    return new _Promise((resolve, reject) => {
      promiseArr.map((promise) => {
        if (isPromise(promise)) {
          promise.then(resolve, reject)
        } else {
          resolve(promise)
        }
      })
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环调用'))
  }
  let called = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (v) => {
            if (called) return
            called = true
            resolvePromise(promise2, v, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true

            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true

      reject(e)
    }
  } else {
    resolve(x)
  }
}
function isPromise(x) {
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then = x.then
    return typeof then === 'function'
  }
  return false
}
function isIterable(value) {
  return value != null && value != undefined && typeof value[Symbol.iterator] === 'function'
}
///////////////////////////////////////
// 需求:实现_Promise对象的finally方法
// finally特点：
// 1. finally 无论Promise对象成功还是失败都会走finally，并且回调不带参数
// 2. 如果finally正常执行（finally内部不返回Promise对象）之后，的then或者catch正常承接之前的Promise对象
// 3. 如果finally的主Promise对象状态为成功，finally对象返回的Promise对象也是成功，后续then或catch取主Promise对象成功的结果
// 4. .............................成功................................失败, 后续then或catch取finally内Promise对象失败的结果
// 5. .............................失败................................成功, 后续then或catch取主Promise对象失败的结果
// 6. .............................失败................................失败, 后续then或catch取finally内Promise对象失败的结果

Promise.reject('promise err')
  .finally(() => {
    console.log('finally')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('new Promise success')
      }, 2000)
    })
  })
  .then((res) => {
    console.log('success:' + res)
  })
  .catch((err) => {
    console.log('error:' + err)
  })

// 辅助理解t1
function finallyCallback() {
  throw new Error('sss')
}
_Promise
  .resolve(finallyCallback())
  .then(() => 33)
  .then(
    (res) => console.log(res),
    (err) => console.log(err)
  )
