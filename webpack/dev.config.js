const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.config');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parentPath = path.resolve(__dirname, '..');

module.exports = webpackMerge(webpackCommon,{
  entry: path.resolve(`${parentPath}/src/demo.js`),

  output: {
    path: path.resolve(`${parentPath}/demo`),
    filename: "build.js"
  },
  devtool:'source-map',
  mode: 'development',

  plugins: [
    new DefinePlugin({

    }),
    new HtmlWebpackPlugin({
      title: 'react-d3-pie',
      inject: true,
      template: path.resolve(__dirname,'../public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new webpack.HotModuleReplacementPlugin()
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