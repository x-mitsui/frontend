const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: { path: resolve(__dirname, "dist"), filename: "bundle.js" },
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
};
