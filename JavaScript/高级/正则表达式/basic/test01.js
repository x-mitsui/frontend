// //过滤数字
// let hd = "houdunren2200hdcms9988";
// let rt0 = [...hd]
//   .filter((el) => {
//     return isNaN(parseInt(el));
//   })
//   .join("");
// console.log(rt0);
// console.log(hd);

// let rt1 = hd.match(/a-z/);
// console.log(rt1);

// const url = `
//   https://www.houdunren.com
//   hdcms.com
// `;
// console.log(url.match(/.+/)[1]);

// let hd3 = "houdunren.com HOUDUNREN.COM";
// hd3 = hd3.replace(/houdunren\.com/gi, "houdunren.com");
// console.log(hd3);
// let hd2 = "houdunren";
// hd2 = hd2.replace(/u/g, "@");
// console.log(hd2);

// let hd4 = `
//   #1 js,200元 #
//   #2 php,300元 #
//   #9 houdunren.com # 后盾人
//   #3 node.js,180元 #
//   #11 java,100元 # test,p
// `;
// // [{name:'js',price:'200元'}]
// let lessons = hd4.match(/^\s*#\d+\s+.+\s+#$/gm).map((v) => {
//   v = v.replace(/\s*#\d+\s*/, "").replace(/\s+#/, "");
//   [name, price] = v.split(",");
//   return { name, price };
// });
// console.log(JSON.stringify(lessons, null, 2));

let hd = `后盾人不断分享视频教程，后盾人网址是 houdunren.com`;
let reg = /后盾人(.{2})/g;
reg.lastIndex = 10; //从索引10开始搜索
console.log(reg.exec(hd));
console.log(reg.lastIndex);

reg = /\p{sc=Han}/gu;
while ((res = reg.exec(hd))) {
  console.log(res[0]);
}
