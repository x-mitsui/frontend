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

      // 发布
      this.onFulfilledCallbacks.forEach((fulcal) => fulcal(value))
    }
    const reject = (reason) => {
      this.reason = reason
      this.status = REJECTED

      // 发布
      this.onRejectedCallbacks.forEach((rejcal) => rejcal(reason))
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

    if (this.status === PENDING) {
      // 订阅
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
  }
}

// test1
console.log('test1----')
let p = new _Promise((resolve, reject) => {
  // promise简单实现里，没有针对“延迟执行”这种情况的处理；目标：“延迟执行”也能“延迟回调”，具体实现类似发布-订阅模式
  setTimeout(() => {
    resolve('延迟执行~~')
  }, 1000)
})

p.then(
  (value) => console.log('fulfilled1:', value),
  (reason) => console.log('rejected1:', reason)
)

// test2，多次then也能打印

p.then(
  (value) => console.log('fulfilled2:', value),
  (reason) => console.log('rejected2:', reason)
)
