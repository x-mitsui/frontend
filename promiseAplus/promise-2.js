// 了解Promise链式调用

//////////////////////////////////////////////////////////////////////////////////////////////////
/*
let promise = new Promise((resolve) => {
  resolve(1)
})

promise
  .then((value) => {
    return value
  })
  .then((value) => {
    return new Promise((resolve, reject) => { //testpoint
      setTimeout(() => {
        resolve(value)
      }, 2000)
    })
  })
  .then((value) => {
    console.log(value)
  })
*/
//////////////////////////////////////////////////////////////////////////////////////////////////
/*
let promise = new Promise((resolve) => {
  resolve(1)
})

promise
  .then((value) => {
    return value
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('reason') // testpoint
      }, 2000)
    })
  })
  .then(
    (value) => {
      console.log(value)
    },
    (reason) => {
      console.log('rejected:', reason)//rejected: reason
    }
  )
  */

//////////////////////////////////////////////////////////////////////////////////////////////////
/*
let promise = new Promise((resolve) => {
  resolve(1)
})

promise
  .then((value) => {
    return value
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('reason')
      }, 2000)
    })
  })
  .then(
    (value) => {
      console.log('fulfilled1', value)
    },
    (reason) => {
      console.log('rejected1:', reason) //rejected1: reason
    }
  )
  .then(
    (value) => {
      console.log('fulfilled2:', value)// fulfilled2:undefined   testpoint
    },
    (reason) => {
      console.log('rejected2:', reason)
    }
  )
  */
//////////////////////////////////////////////////////////////////////////////////////////////////
/*
let promise = new Promise((resolve) => {
  resolve(1)
})

promise
  .then((value) => {
    return value
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('res')
      }, 2000)
    })
  })
  .then(
    (value) => {
      throw new Error('reason1') // test point
    },
    (reason) => {
      console.log('rejected1:', reason) 
    }
  )
  .then(
    (value) => {
      console.log('fulfilled2:', value) 
    },
    (reason) => {
      console.log('rejected2:', reason)//rejected2: Error: reason1
    }
  )
*/
//////////////////////////////////////////////////////////////////////////////////////////////////
/*
let promise = new Promise((resolve) => {
  resolve(1)
})

promise
  .then((value) => {
    return value
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('res')
      }, 2000)
    })
  })
  .then(
    (value) => {
      throw new Error('reason1') // test point
    },
    (reason) => {
      console.log('rejected1:', reason)
    }
  )
  .then((value) => {
    console.log('fulfilled2:', value)
  })
  //testpoint
  .catch((reason) => {
    console.log('catch:', reason)
    return 0
  })
  //testpoint
  .then((value) => {
    console.log('Then:', value)
  })
*/
// 总结：
// catch也是一个then，遵循then的运行原则
/**
 * 如何让下一次走成功的回调
 * then return一个普通的JavaScript值，包括undefined
 * then return一个 会返回成功态的 Promise对象
 *
 * 如何让下一次走失败的回调
 * then return一个 会返回失败态的 Promise对象
 * then 抛出了异常
 *
 * then实际上返回的是一个promise
 * */

/*
// 对比下面两个promise
// promiseAA为第二次then返回的Promise对象
let promiseAA = promise.then((value) => {}).then((value) => {})

// promiseBB为第一次then返回的Promise对象
let promiseBB = promise.then(() => {})
*/

// 检测一下return javascript普通值的一些情况
new Promise((resolve) => {
  resolve(11)
})
  .then((res) => {
    // return null //test位置打印null
    // return undefined //test位置打印undefined
    // return { a: 2 } //test位置打印{ a: 2}
    return function () {
      // test位置打印function...
      console.log('123')
    }
  })
  .then(
    (res) => {
      console.log(res) //test
    },
    (reason) => {
      console.log(reason)
    }
  )
