require("babel-register");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
      hash: true
    })
  ]
};
module.exports = config;
