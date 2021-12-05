const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        // loader可以帮助我们处理js之外的文件
        // file-loader将图片从源目录负责一份到最终包里，
        // 并重新命名，通过import后可以发现它被解析成了一个名字
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "url-loader", //url-loader可以将图片转换为base64（file-loader不行）,用于小图会合适，太大就会导致base64太长，导致bundle文件太大
          options: {
            name: "imgs/[name].[hash:6].[ext]", //使用原文件名和原扩展
            // 也可以单独指定路径
            // outputPath: "imgs/",
            limit: 10 * 1024, //单位：字节
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },

          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         // 其实可以删掉，因为postcss-preset-env已经包含了autoprefixer特性
          //         // require("autoprefixer"),
          //         //
          //         // require("postcss-preset-env"),
          //         // 也可以直接简写成字符串
          //         "postcss-preset-env",
          //       ],
          //     },
          //   },
          // },
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
};
