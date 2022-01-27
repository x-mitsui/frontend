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
      // if (this.status !== PENDING) return
      this.value = value

      this.status = FULFILLED

      this.onFulfilledCallbacks.forEach((fulcal) => {
        fulcal()
      })
    }
    const reject = (reason) => {
      // if (this.status !== PENDING) return

      this.reason = reason
      this.status = REJECTED

      this.onRejectedCallbacks.forEach((rejcal) => rejcal())
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
const promise = new _Promise((resolve, reject) => {
  resolve('value')
})

let p2 = promise.then((value) => {
  return new _Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        new _Promise((resol, rejec) => {
          resol('new Promise resolve')
        })
      )
    }, 1000)
  })
})

p2.then()
  .then()
  .then()
  .then(
    (v) => {
      console.log(v)
    },
    (e) => {
      console.log('=>', e)
    }
  )
  .then(() => {
    throw Error('Error')
  })
  .catch((e) => {
    console.log(e)
  })

// promise-test
_Promise.defer = _Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new _Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = _Promise
