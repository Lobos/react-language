var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'ReactLanguage': "./src/index.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    library: 'ReactLanguage',
    libraryTarget: 'umd',
    filename: '[name].js'
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM'},
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ["react", "es2015"]
        }
      },
    ]
  }
};

