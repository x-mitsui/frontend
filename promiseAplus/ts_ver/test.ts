import { TS_Promise } from "./promise-ts";
/***********test***********/
// test1
// const promise = new TS_Promise((resolve) => {
//   resolve(1);
// });
// promise.then(
//   (res: any) => {
//     console.log("value:", res);
//   },
//   (reason: any) => {
//     console.log("reason:", reason);
//   }
// );

// test2
// const promise = new TS_Promise((resolve) => {
//   setTimeout(() => {
//     resolve(1);
//   });
// });
// promise.then(
//   (res: any) => {
//     console.log("value:", res);
//   },
//   (reason: any) => {
//     console.log("reason:", reason);
//   }
// );

// test3 ,注意执行器第二个参数写不写都可以，由ts语法决定
// const promise = new TS_Promise((resolve, reject) => {
//   throw new Error("my error");
// });
// promise.then(
//   (res: any) => {
//     console.log("value:", res);
//   },
//   (reason: any) => {
//     console.log("reason:", reason);
//   }
// );

// test4 链式调用
// const promise = new TS_Promise((resolve, reject) => {
//   resolve(1);
// });
// promise
//   .then(
//     (res: any) => {
//       console.log("value:", res);
//       return "2";
//     },
//     (reason: any) => {
//       console.log("reason:", reason);
//     }
//   )
//   .then(
//     (v: any) => {
//       console.log("链式：", v);
//     },
//     (r: any) => {
//       console.log("链式：", r);
//     }
//   );

// test5
// const promise = new TS_Promise((resolve, reject) => {
//   resolve(1);
// });
// console.log("wai:", promise);
// // const f = promise;
// promise
//   .then(
//     (res: any) => {
//       console.log("value:", res);
//       return new TS_Promise((resolve, reject) => {
//         // resolve(2);
//         resolve(
//           new TS_Promise((resolve, reject) => {
//             resolve(3);
//           })
//         );
//       });
//     },
//     (reason: any) => {
//       console.log("reason:", reason);
//     }
//   )
//   .then(
//     (v: any) => {
//       console.log("链式v：", v);
//     },
//     (r: any) => {
//       console.log("链式r：", r);
//     }
//   );

// test6
// const promise = new TS_Promise((resolve, reject) => {
//   resolve(1);
// });
// promise
//   .then(
//     (res: any) => {
//       throw new Error("wwww");
//     },
//     (reason: any) => {
//       console.log("reason:", reason);
//     }
//   )
//   .then(
//     (v: any) => {
//       console.log("链式v：", v);
//     },
//     (r: any) => {
//       console.log("链式r：", r);
//     }
//   );
// test7 多个then参数为空
// const promise2 = new TS_Promise((resolve, reject) => {
//   resolve(1);
// });

// promise2
//   .then()
//   .then()
//   .then()
//   .then(
//     (res: any) => {
//       console.log("value:", res);
//       return new TS_Promise((resolve, reject) => {
//         resolve(2);
//       });
//     },
//     (reason: any) => {
//       console.log("reason:", reason);
//     }
//   )
//   .then(
//     (v: any) => {
//       console.log("链式v：", v);
//     },
//     (r: any) => {
//       console.log("链式r：", r);
//     }
//   );

// all 全部成功才能返回成功回调，一个失败就直接那个失败的回调
// const p1 = new TS_Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 3000);
// });
// const p2 = new TS_Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2);
//   }, 1000);
// });
// const p3 = 3;
// TS_Promise.all([p1, p2, p3]).then((res: any) => {
//   console.log(res);
// });

// allSettled
// const p1 = new TS_Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 1500);
// });
// const p2 = new TS_Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(2);
//   }, 1000);
// });
// const p3 = 3;
// TS_Promise.allSettled([p1, p2, p3]).then((res: any) => {
//   console.log(res);
// });

// race
// const p1 = new TS_Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1);
//   }, 1500);
// });
// const p2 = new TS_Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject(2);
//   }, 1000);
// });
// const p3 = 3;
// let arr1 = [p1, p2, p3];
// let arr2 = [p1, p2];
// TS_Promise.race(arr1).then(
//   (res: any) => {
//     console.log("res:", res);
//   },
//   (err: any) => {
//     console.log("err:", err);
//   }
// );

// 真是ts版Promise
let p = new Promise<number>((resolve, reject) => {
  resolve(3);
});
p.then((res) => {
  console.log(res);
});
