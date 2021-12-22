export default {
  install(app) {
    console.log("巫师~~~~");
    console.log(app);
    // $是命名习惯，以便和其它data变量区分
    app.config.globalProperties.$name = "JAMES";
  },
};
