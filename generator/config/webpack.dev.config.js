const path = require("path");
const { ROOT_DIRECTORY, hCreateDynamicEntriesModules } = require("./helpers");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: hCreateDynamicEntriesModules(),
  output: {
    path: path.resolve(ROOT_DIRECTORY, "generator/dist"),
    filename: "[name].js",
    chunkFilename: "[name].module.js",
    library: "[name]",
    libraryTarget: "umd",
  },
  devServer: {
    contentBase: path.resolve(ROOT_DIRECTORY, "generator/dist"),
    compress: true,
    port: 3000,
    overlay: true,
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            configFile: path.resolve(
              ROOT_DIRECTORY,
              "generator/config/babel.config.js"
            ),
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "generator/src/index.html"),
      filename: "index.html",
      chunks: ["FormValidator"],
      inject: "head",
    }),
  ],
};
