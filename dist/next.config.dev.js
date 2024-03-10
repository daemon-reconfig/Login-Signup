"use strict";

var HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  webpack: function webpack(config, _ref) {
    var buildId = _ref.buildId,
        dev = _ref.dev,
        isServer = _ref.isServer,
        defaultLoaders = _ref.defaultLoaders,
        _webpack = _ref.webpack;
    config.module.rules.push({
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    });
    config.plugins.push(new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }));
    return config;
  }
};