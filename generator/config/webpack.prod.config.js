const path = require("path");
const { ROOT_DIRECTORY, hCreateDynamicEntriesModules } = require("./helpers");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: hCreateDynamicEntriesModules(),
  output: {
    path: path.resolve(ROOT_DIRECTORY, "generator/dist"),
    filename: "[name].js",
    chunkFilename: "[name].module.js",
    library: "[name]",
    libraryTarget: "umd",
  },
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIRECTORY, "generator/src/index.html"),
      filename: "index.html",
      inject: "head",
      chunks: ["FormValidator"],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].bundle.css",
      chunkFilename: "[name].[contenthash:8].chunk.css",
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      compressionOptions: { level: 9 },
      filename: "[path].gz[query]",
      minRatio: 0.8,
      test: /\.(js)$/,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            comparisons: false,
            ecma: 5,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ascii_only: true,
            comments: false,
            ecma: 5,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "async",
    },
  },
};
