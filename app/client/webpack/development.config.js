const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  devServer: {
    inline: true,
    hot: true,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
      __DEVELOPMENT__: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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

