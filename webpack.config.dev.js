const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
module.exports = {
  mode:"development",
  entry: "./src/index.js",
  output:{
    path : path.resolve(__dirname,"dist"),
    filename : 'main.js'
  }, 
  resolve:{
    extensions: ['.js']
  },
  module: {
    rules:[
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css)$/i, 
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns:[
        {
          from: path.resolve(__dirname,"src/style.css"),
          to: "assets/styles"
        }
      ]
    }),
    new Dotenv()
  ],
  devServer:{
    contentBase: path.join(__dirname,"dist"),
    compress: true,
    historyApiFallback: true,
    port: 3004,
    open: true,
  }
}