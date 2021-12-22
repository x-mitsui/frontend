import timeFormat from "../05_插件/modifiers/timeFormat";
export default function (app) {
  timeFormat(app);
  // app.component("xxx") 可以注册全局组件
  // app.mixin() 可以混入
}
