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
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
        query: { presets: ['es2015'] },
      },
      {
        test: /\.ttf$/,
        loader: 'file',
        query: { name: 'fonts/[name].[ext]' },
      },
      {
        test: /\.png$/,
        loader: 'file',
      },
      {
        test: /\.html$/,
        loader: 'file-loader?name=[name].[ext]!extract-loader!html-loader',
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: '/',
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
