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
        //补丁2：递归拆解Promise对象

        value.then(resolve, reject) //这里为什么可以使用reject，原因很简单看文本【例子3】
        return
      }
      if (this.status === PENDING) {
        //补丁1
        this.value = value

        this.status = FULFILLED

        this.onFulfilledCallbacks.forEach((fulcal) => fulcal())
      }
    }
    const reject = (reason) => {
      if (this.status === PENDING) {
        //补丁1
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
        // 解决检测所提错误
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
///////////////////////////////////////////////////////
// const promise = new _Promise((resolve, reject) => {
//   // 之前遗留问题，这里resolve和reject均执行了，参照补丁1
//   resolve('a')
//   reject('b')
// })

// promise.then(
//   (value) => {
//     console.log(value)
//   },
//   (reason) => {
//     console.log(reason)
//   }
// )

const promise = new _Promise((resolve, reject) => {
  resolve(
    new _Promise((resolve, reject) => {
      setTimeot(() => {
        resolve('the answer has been come out')
      }, 1000)
    })
  )
})

promise.then((value) => {
  console.log(value)
})
/*
打印结果：需要解决，见补丁2
_Promise {
  status: 'pending',
  value: undefined,
  reason: undefined,
  onFulfilledCallbacks: [],
  onRejectedCallbacks: []
}
*/

// 例子3：基础
const foo = function () {
  bar() // ---[1]
}
const bar = function () {
  // ---[2]
  console.log('v')
}
foo() //---[3]
// 可以明显看出，运行到[3]时，bar已经被定义
