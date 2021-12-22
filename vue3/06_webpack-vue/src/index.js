import "./js/element.js";
const { createApp } = require("vue");
import App from "./vue/app.vue";
const a = 3 + 6;
const br = () => {
  console.log(a);
};
br();

const app = createApp(App);
app.mount("#app");

// console.log(b);
