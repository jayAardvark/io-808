require("dotenv").config();

var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var { WebpackPluginServe: Serve } = require("webpack-plugin-serve");
var CopyPlugin = require("copy-webpack-plugin");

var babelConfig = require("./babelConfig");

var outputPath = path.join(__dirname, "dist");

var fontBaseURL = process.env.WEBFONT_BASE_URL;

module.exports = {
  mode: "development",
  entry: ["./src/index", "webpack-plugin-serve/client"],
  output: {
    path: outputPath,
    filename: "[name].mjs",
    publicPath: "/"
  },
  optimization: {
    nodeEnv: "development"
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [{ loader: "pug-loader", options: {} }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              include: path.join(__dirname, "src"),
              ...babelConfig(true)
            }
          }
        ]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8192
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource"
      }
    ]
  },
  node: false,
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "static/**/*" }]
    }),
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      inject: false,
      cache: false,
      template: "src/index.pug",
      templateParameters: {
        fontBaseURL
      },
      filename: "index.html",
      title: "iO-808"
    }),
    new Serve({
      static: outputPath,
      hmr: false,
      liveReload: true,
      host: "0.0.0.0",
      port: 3000
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".json"]
  },
  watch: true
};
