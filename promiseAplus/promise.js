//promise简单实现

const FULFILLED = 'FULFILLED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'

class _Promise {
  // 理解难点一：接收一个函数E作为参数，但是函数E执行时的参数，由Promise内部指派
  constructor(executor) {
    this.status = PENDING
    this.reason = null
    this.value = null

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}

// test1
// let p = new _Promise((resolve, reject) => {
//   resolve(33)
// })

// p.then((value) => {
//   console.log(value)
// })

// test2
// let p = new _Promise((resolve, reject) => {
//   reject("nonono")
// })

// p.then((value) => {
//   console.log(value)
// }, (reason) => console.log(reason))

// test3
let p = new _Promise((resolve, reject) => {
  throw Error('error_mes')
})

p.then(
  (value) => {
    console.log('成功执行：', value)
  },
  (reason) => console.log('打印错误：', reason)
)
