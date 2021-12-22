const path = require("path");

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.comm.config");
module.exports = merge(commonConfig, {
  mode: "development",
  // 设为source-map，报错可以溯源
  devtool: "source-map",
  devServer: {
    // 开发阶段如果devServer打包内存后没有找到资源，会去contentBase去查找
    // 生成阶段使用CopyWebpackPlugin
    // contentBase: "./public",//失效了
    static: {
      directory: path.join(__dirname, "../build"),
    },
    // 模块热替换，同时将target设为web
    hot: true,
    // host: "0.0.0.0",
    // host: "127.0.0.1",
    // port: 7777,
    open: true,
    // gzip压缩
    compress: true,
    // 开发阶段代理服务器
    /////// axios.get('/api/moment).then....
    // proxy: {
    //   "/api":
    //     {
    //        target: "http://localhost:8188",//被代理的目标服务器地址
    //        pathRewrite: {
    //          "^/api": ""
    //        },
    //        secure: false,//如果target是https但无证书，仍旧要代理，可以设secure为false
    //        // 改成target相同的源，不然会将本地的源发送过去
    //        changeOrigin: true
    //      }
    //
    // }
  },
});
