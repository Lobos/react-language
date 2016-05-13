'use strict';

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var config = require("./webpack.config.js");

var app = express();
var compiler = webpack(config);

config.entry = {
  demo: [
    'webpack-hot-middleware/client',
    './demo/index.js'
  ]
};
config.module.loaders.push({
  test: /\.jsx?$/,
  loader: 'babel',
  query: {
    presets: ["react", "es2015", "react-hmre"]
  }
});
config.plugins = [new webpack.HotModuleReplacementPlugin()];
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/'
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'demo/index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});


