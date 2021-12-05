const path = require("path");
console.log("__dirname:" + __dirname);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  devServer: {
    //开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: "./build",
    // open: true,
    // compress: true,
  },
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true, //去除双引号
        collapseWhitespace: true, //去除空格
      },
      hash: true,
    }),
    new MiniCssExtractPlugin({ filename: "styles.css" }),
  ],
  module: {
    //模块
    rules: [
      //loader的特点：功能单一
      //style-loader把css插入到head标签中
      //规则 css-loader 主要负责解析@import这种语法
      //loader执行顺序书写：默认从右往左
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
    ],
  },
};
