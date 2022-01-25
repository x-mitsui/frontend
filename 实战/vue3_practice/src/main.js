// vue2
// yarn add vue-loader vue-template-compiler html-webpack-plugin -D
// new Vue({
//   render: (h) => h(App),
// }).$mount("#app");
////////////////////////////////////
// vue3
// yarn add -D @vue/compiler-sfc vue-loader@next
/**
 * Vue核心：模板语法->编译->渲染dom
 */
import App from "./App.vue";

import { createApp } from "vue/dist/vue.esm-bundler.js";

// createApp(App)返回的是一个应用实例
// component 注册组件
// mixin
// direactive
// use 使用插件
// 这些方法都会返回app实例

// App是根组件，是一个对象，渲染的起点
const vm = createApp(App).mount("#app");
console.log(vm); //返回的是根组件实例
// 每个组件都有自己的组件实例，一个应用的所有的组件都共享一个应用实例
// 所有组件包括根组件的配置选项和组件行为都一样
