// 增加链式调用功能，
// 第1步，then要返回一个promise
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
      this.value = value
      this.status = FULFILLED

      this.onFulfilledCallbacks.forEach((fulcal) => fulcal())
    }
    const reject = (reason) => {
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
    // 第1步，then要返回一个promise
    let promise2 = new _Promise((resolve, reject) => {
      // 第2步，处理不同的返回值x, x可能为一般JavaScript值，也可能为Promise对象，还有可能直接报异常，这里引入处理函数专门处理
      if (this.status === FULFILLED) {
        try {
          let x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject) //第三步要解决：Cannot access 'promise2' before initialization，转到promise-4.js，看解决办法
        } catch (e) {
          console.log(reject)
          reject(e)
        }
      }

      if (this.status === REJECTED) {
        try {
          let x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
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

function resolvePromise(promise2, x, resolve, reject) {}

const promise = new _Promise((resolve, reject) => {
  resolve('promise')
})

promise
  .then(
    (res) => {
      console.log('res1:', res)
    },
    (reason) => {
      console.log('reason1:???????????', reason)
    }
  )
  .then(
    (res) => {
      console.log('res2:', res)
    },
    (reason) => {
      console.log('reason2:???????????', reason)
    }
  )
