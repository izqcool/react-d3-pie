const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.config');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const parentPath = path.resolve(__dirname, '..');
const libraryName = 'react-d3-pie';
module.exports = webpackMerge(webpackCommon,{

  entry: path.resolve(`${parentPath}/src/index.js`),

  output: {
    path: path.resolve(`${parentPath}/dist`),
    filename: "build.js",

    /* it is important to set this for the build.js can export */
    library: libraryName,
    libraryTarget: 'umd'
  },
  devtool: false,

  mode: 'production',

  plugins: [
    new DefinePlugin({

    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true
        }
      })
    ]
  }

});