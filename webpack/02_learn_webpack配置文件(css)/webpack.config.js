const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"), //必须是绝对路径
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
    ],
  },
};
