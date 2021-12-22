const { resolve } = require("path");
module.exports = {
  entry: "./src/index.js",
  output: { path: resolve(__dirname, "dist"), filename: "bundle.js" },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  // 也可以抽取出去，具体见webpack
                  require("postcss-preset-env"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
