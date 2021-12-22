const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  // 开发模式development代码不会压缩
  mode: "production",
  // 设为source-map，报错可以溯源
  devtool: "source-map",
  entry: "./src/index.js",
  output: { path: resolve(__dirname, "dist"), filename: "js/bundle.js" },
  module: {
    rules: [
      // {
      //   test: /\.(jpe?g|png|svg|gif)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       // outputPath: "img",
      //       name: "img/[name]_[hash:6].[ext]",
      //       limit: 1024 * 30,
      //     },
      //   },
      // },
      {
        test: /\.(less|css)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
        generator: {
          filename: "img/[name]_[hash:6][ext]",
        },
      },
      // {
      //   test: /\.(eot|ttf|woff2?)$/,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       // outputPath: "font",
      //       name: "font/[name]_[hash:6].[ext]",
      //     },
      //   },
      // },
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: "asset/resource",
        generator: { filename: "font/[name]_[hash:6][ext]" },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "我是title",
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          // 和最外层output路径拼接
          to: "./",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
};
