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
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value // 新功能2
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason
          } // 新功能2
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
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
    })

    return promise2
  }

  catch(errorCallback) {
    //新功能3
    return this.then(null, errorCallback)
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // console.log(promise2)
  console.log('x:', x)

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
            resolvePromise(promise2, v, resolve, reject) // 添加新功能1
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

// 引入called变量
let p2 = promise.then((value) => {
  return new _Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        new _Promise((resol, rejec) => {
          resol('new Promise resolve') //测试1对应新功能1
        })
      )
    }, 1000)
  })
})

p2.then()
  .then()
  .then()
  .then(
    //测试2：多个无参then---对应新功能2
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
    //测试3：对应新功能2
    console.log(e)
  })
