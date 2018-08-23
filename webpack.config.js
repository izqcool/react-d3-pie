// webpack
const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: `${__dirname/src/index.js}`,
  output: {
    path: `${__dirname/dist}`,
    filename: "build.js"
  }
};


