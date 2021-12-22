import { createApp } from "vue";
import App from "./05_插件/App.vue";
import pluginObject from "./plugins/plugins_object";
import pluginsFunction from "./plugins/plugins_function";
const app = createApp(App);
app.directive("focus", {
  mounted(el, bindings, vnode, preNode) {
    console.log("global focus mounted");
    el.focus();
  },
});
// 使用插件，内部会自动调用pluginObject.plugin(app)
app.use(pluginObject);
// 插件为函数
app.use(pluginsFunction);
app.mount("#app");
