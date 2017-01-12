const path = require('path');

module.exports = {
  entry: {
    home: path.join(__dirname, 'app/src/home'),
  },

  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: '/build/',
    filename: '[name].js',
  },


  // --------------------------------------------------------------------------


  devServer: {
    contentBase: path.join(__dirname, 'app'),
  },
};
