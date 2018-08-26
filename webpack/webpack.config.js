// webpack
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const parentPath = path.resolve(__dirname, '..');


module.exports = {
  // entry: path.resolve(`${parentPath}/src/index.js`),
  // output: {
  //   path: path.resolve(`${parentPath}/dist`),
  //   filename: "build.js"
  // },

  mode: 'production',

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_module/,
      },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/,
        // include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  // resolve: {
  //   modules: [path.resolve('./src')],
  //   extensions: ['.json', '.js', '.css'],
  // },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin()
  //   ]
  // }
};


