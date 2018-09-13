const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const parentPath = path.resolve(__dirname, '..');

module.exports = webpackMerge(webpackCommon,{

  entry: path.resolve(`${parentPath}/src/index`),

  output: {
    path: path.resolve(`${parentPath}/dist`),
    filename: "build.js"
  },
  devtool:'source-map',

  mode: 'production',



  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }

});