const { _Promise } = require('./promise-14.js')
module.exports = {
  promisify(fn) {
    return function (...args) {
      return new _Promise((resolve, reject) => {
        fn(...args, (error, data) => {
          if (error) {
            return reject(error)
          }
          resolve(data)
        })
      })
    }
  },
  // 可以用来将fs内部所有方法promise化
  promisifyAll(fns) {
    Object.keys(fns).map((fnName) => {
      if (typeof fns[fnName] === 'function') {
        fns[fnName + 'Async'] = this.promisify(fns[fnName])
      }
    })
    return fns
  },
}
