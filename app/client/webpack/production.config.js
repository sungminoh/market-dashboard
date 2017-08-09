const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __DEVELOPMENT__: true,
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot-loader', 'babel-loader'],
      exclude: /(node_modules|bower_components)/,
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?modules=true&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      ],
    }],
  },
};
