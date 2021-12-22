const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const VueLoaderPlugin = require("vue-loader/dist/plugin").default;
const path = require("path");
module.exports = {
  target: "web",

  entry: "./src/index.js",
  output: { path: resolve(__dirname, "../build"), filename: "js/bundle.js" },

  resolve: {
    extensions: [".js", ".json", ".vue", ".ts", ".css"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      js: path.resolve(__dirname, "../src/js"),
    },
  },
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
      // {
      //   test: /\.js$/,
      //   use:
      //   {
      //     loader: "babel-loader",
      //     options: {
      //       // plugins: [
      //       //   "@babel/plugin-transform-arrow-functions",
      //       //   "@babel/plugin-transform-block-scoping",
      //       // ],
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      // },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 相对于工程根目录
      template: "./public/index.html",
      title: "我是title",
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),

    new VueLoaderPlugin(),
  ],
};
