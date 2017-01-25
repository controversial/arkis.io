const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // These names MUST match the folder name within app/src so that the JS bundle doesn't end up in
    // a different directory from the files copied by file-loader
    home: path.join(__dirname, 'app/src/home'),
    404: path.join(__dirname, 'app/src/404'),
  },

  module: {
    loaders: [
      // SASS files
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // JavaScript files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
        query: { presets: ['es2015'] },
      },
      // HTML files
      {
        test: /\.html$/,
        loader: 'file-loader?name=[path][name].[ext]&context=app/src!extract-loader!html-loader',
      },
      // Files that require no compilation or processing
      {
        test: /\.(ttf|woff|woff2|png)$/,
        loader: 'file',
        query: { name: '[path][name].[ext]', context: 'app/src' },
      },
    ],
  },

  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: '/',
    filename: '[name]/index.js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false } }),
  ],


  // --------------------------------------------------------------------------


  devServer: {
    contentBase: path.join(__dirname, 'app/build'),
  },
};
