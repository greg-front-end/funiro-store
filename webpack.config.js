'use strict';

let path = require('path');

module.exports = {
  mode: 'development',
  entry: './#src/js/script.js',
  output: {
    filename: 'script.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "none",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
                debug: true,
                corejs: 3,
                useBuiltIns: "usage"
            }]]
          }
        }
      }
    ]
  }
};
