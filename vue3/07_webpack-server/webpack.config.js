const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/dist/plugin").default;
const path = require("path");
module.exports = {
  target: "web",
  // 开发模式development代码不会压缩
  mode: "development",
  // 设为source-map，报错可以溯源
  devtool: "source-map",
  entry: "./src/index.js",
  output: { path: resolve(__dirname, "dist"), filename: "js/bundle.js" },
  devServer: {
    // 开发阶段如果devServer打包内存后没有找到资源，会去contentBase去查找
    // 生成阶段使用CopyWebpackPlugin
    // contentBase: "./public",
    static: {
      directory: path.join(__dirname, "dist"),
    },
    // 模块热替换，同时将target设为web
    hot: true,
    // host: "0.0.0.0",
    // host: "127.0.0.1",
    // port: 7777,
    open: true,
    // gzip压缩
    compress: true,
    // 开发阶段代理服务器
    /////// axios.get('/api/moment).then....
    // proxy: {
    //   "/api":
    //     {
    //        target: "http://localhost:8188",//被代理的目标服务器地址
    //        pathRewrite: {
    //          "^/api": ""
    //        },
    //        secure: false,//如果target是https但无证书，仍旧要代理，可以设secure为false
    //        // 改成target相同的源，不然会将本地的源发送过去
    //        changeOrigin: true
    //      }
    //
    // }
  },
  resolve: {
    extensions: [".js", ".json", ".vue", ".ts", ".css"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      js: path.resolve(__dirname, ".src/js"),
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "我是title",
    }),
    new DefinePlugin({
      BASE_URL: '"./"',
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
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
    new VueLoaderPlugin(),
  ],
};
