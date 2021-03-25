const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  mode:"production",
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
    })
  ],
  optimization:{
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}