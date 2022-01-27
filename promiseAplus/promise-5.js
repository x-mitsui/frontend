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
      console.log('执行了。。。resolve' + value)
      this.value = value
      this.status = FULFILLED

      this.onFulfilledCallbacks.forEach((fulcal) => fulcal())
    }
    const reject = (reason) => {
      // if (this.status !== PENDING) return
      console.log('执行了。。。reject' + reason)
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
    let promise2 = new _Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            console.log('>>>>>', reject)
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
}

function resolvePromise(promise2, x, resolve, reject) {
  console.log(promise2)
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
            console.log('XXXXX-----')
            resolve(v)
          },
          (r) => {
            if (called) return
            called = true
            console.log('YYYYY-----')
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      console.log('没有then')

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
promise
  .then((value) => {
    return new _Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('-id:1')
        reject('-id:2')
      }, 1000)
    })
  })
  .then(
    (v) => {
      console.log('->', v)
    },
    (e) => {
      console.log('=>', e)
    }
  )
