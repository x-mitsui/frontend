const util = require('./util.js')
const fs = require('fs')

////////////////测试1///////////////////////
// const readFile_promisify = util.promisify(fs.readFile)
// readFile_promisify('./promise-1.js', 'utf8').then(
//   (res) => {
//     console.log(res)
//   },
//   (err) => {
//     console.log(err)
//   }
// )

////////////////测试2///////////////////////
util.promisifyAll(fs)
fs.readFileAsync('./promise-1.js', 'utf8').then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)
