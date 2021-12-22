import "./js/element.js";
const { createApp } = require("vue");
import App from "./vue/app.vue";
// if (module.hot) {
//   module.hot.accept("./js/element.js", () => {
//     console.log("element.js模块热更新了");
//   });
// }
const a = 3 + 6;
const br = () => {
  console.log(a);
};
br();

const app = createApp(App);
app.mount("#app");

console.log();
