const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"), //必须是绝对路径
    publicPath: "./build/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         // require("autoprefixer"),
          //         require("postcss-preset-env"), //包含autoprefixer特性
          //       ],
          //     },
          //   },
          // },
        ],
      },
      {
        test: /\.(jpe?g|gif|svg|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "img/[name].[hash:6].[ext]",
              limit: 8 * 1024, //单位 Byte
              // outputPath: "img",
            },
          },
        ],
      },
    ],
  },
};
