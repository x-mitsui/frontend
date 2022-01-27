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
      console.log('执行了。。。resolve' + value)
      this.value = value
      this.status = FULFILLED

      this.onFulfilledCallbacks.forEach((fulcal) => fulcal())
    }
    const reject = (reason) => {
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
    // 第1步，then要返回一个promise
    let promise2 = new _Promise((resolve, reject) => {
      // 第2步，处理不同的返回值x, x可能为一般JavaScript值，也可能为Promise对象，还有可能直接报异常，这里引入处理函数专门处理
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject) // 这样setTimeout内代码会在then（因为是同步代码）执行完才执行【事件环知识】
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

// 第二步所需处理函数
function resolvePromise(promise2, x, resolve, reject) {
  console.log(promise2)
  console.log('x:', x)

  // x和promise2是同一个会造成死循环
  if (promise2 === x) {
    return reject(new TypeError('循环调用'))
  }

  // 如果x类型为对象或函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      // 通过x.then是否为Promise对象,注意获取x的then属性时，可能会报错，例如Object.defineProperty(x,"then",{get:function(){throw new Error("...")}})
      let then = x.then
      if (typeof then === 'function') {
        console.log('进入====')
        then.call(
          x,
          (v) => {
            console.log('XXXXX-----')
            resolve(v)
          },
          (r) => {
            console.log('YYYYY-----')
            reject(r)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
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

// promise
//   .then(
//     (res) => {
//       console.log('res1:', res)
//       return res
//     },
//     (reason) => {
//       console.log('reason1:???????????', reason)
//     }
//   )
//   .then(
//     (res) => {
//       console.log('res2:', res)
//     },
//     (reason) => {
//       console.log('reason2:???????????', reason)
//     }
//   )

// 通过打印可以看到XXXXX----和YYYYY----都打印了，不满足2.3.3.3.3.怎么处理，看promise-5.js
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
