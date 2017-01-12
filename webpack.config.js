const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    home: path.join(__dirname, 'app/src/home'),
  },

  module: {
    loaders: [
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
        query: { presets: ['es2015'] },
      },
      {
        test: /\.ttf$/,  // Matches common font extensions
        loader: 'file',
        query: { name: 'fonts/[name].[ext]' },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: '/build/',
    filename: '[name].js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
  ],


  // --------------------------------------------------------------------------


  devServer: {
    contentBase: path.join(__dirname, 'app'),
  },
};
