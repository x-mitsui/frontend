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
// 需求:实现_Promise.race
const P = _Promise //将Promise替换为_Promise测试

const p1 = new _Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

const p2 = new _Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error')
  }, 2000)
})
// test1
// P.race([p1, p2, 'normalcase']).then((resArr) => {
//   console.log(resArr)
// })

P.race([p1, p2]).then((resArr) => {
  console.log(resArr)
})
