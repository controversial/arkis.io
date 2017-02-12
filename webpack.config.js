const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    // These names MUST match the folder name within app/src so that the JS bundle doesn't end up in
    // a different directory from the files copied by file-loader
    home: path.join(__dirname, 'app/src/home'),
    404: path.join(__dirname, 'app/src/404'),
    products: path.join(__dirname, 'app/src/products'),
  },

  module: {
    loaders: [
      // SASS files
      {
        test: /\.sass$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // CSS files
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      // JavaScript files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: 'node_modules',
        query: { presets: ['es2015'] },
      },
      // Pug files
      {
        test: /\.pug$/,
        loaders: [
          'file-loader?name=[path][name].html&context=app/src',
          'pug-html-loader?exports=false',
        ],
      },
      // HTML files
      {
        test: /\.html$/,
        loaders: [
          'file-loader?name=[path][name].html&context=app/src',
          'extract-loader',
          'html-loader',
        ],
      },
      // Files that require no compilation or processing
      {
        test: /\.(ttf|woff|woff2|eot|png|svg)/,
        loader: 'url-loader',
        query: { limit: 10000, name: '[path][name].[ext]', context: 'app/src' },
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
    new CopyWebpackPlugin([{ from: 'app/favicons' }]),
  ],


  // --------------------------------------------------------------------------


  devServer: {
    contentBase: path.join(__dirname, 'app/build'),
  },
};
