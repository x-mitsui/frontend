const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// vue2
// const VueLoaderPlugin = require("vue-loader/lib/plugin");
// vue3
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  // externals: {
  //   // 使用外部文件需要配置
  //   vue: "Vue",
  // },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
};
