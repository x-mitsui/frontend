const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"), //必须是绝对路径
    publicPath: "./build/",
    // assetModuleFilename: "img/[name].[hash:6][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(jpe?g|gif|svg|png)$/,
        // type: "asset/resource",//file-loader的效果
        // generator: {
        //   filename: "img/[name].[hash:6][ext]",
        // },
        type: "asset/inline", //url-loader的效果
      },
    ],
  },
};
