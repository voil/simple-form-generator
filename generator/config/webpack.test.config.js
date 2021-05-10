const path = require("path");
const { ROOT_DIRECTORY, hGetTestFiles } = require("./helpers");

module.exports = {
  mode: "none",
  entry: hGetTestFiles(),
  output: {
    path: path.resolve(ROOT_DIRECTORY, "generator/tests"),
    filename: 'bundle.test.js'
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
};
