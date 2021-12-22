const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.comm.config");
module.exports = merge(commonConfig, {
  mode: "production",
  plugins: [
    // new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          // 相对于工程根目录
          from: "./public",
          // 和最外层output路径拼接
          // to: "./",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
});
