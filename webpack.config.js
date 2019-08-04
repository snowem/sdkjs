require("babel-register");
const path = require('path');
const webpack = require('webpack');
const env = require('yargs').argv.env;
const pkg = require('./package.json');
//const HtmlWebpackPlugin = require('html-webpack-plugin')

let libraryName = pkg.name;

let outputFile, mode;

if (env === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  mode: mode,
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './example'),
    filename: outputFile,
    library: 'snowem',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
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
  /*plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
      hash: true
    })
  ]*/
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
};
module.exports = config;
