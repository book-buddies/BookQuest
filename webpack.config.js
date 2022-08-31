const path = require ('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/client/App.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './dist')
    },
    // contentBase: path.resolve(__dirname, "./dist"),
    hot: true,
    proxy: {
      '/api/': 'http://localhost:3000',
    }
  },
  module: {
    rules: [
      {
        // test: /\.jsx?/,
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /.(css|scss)$/,
        exclude: [/node_modules/, /client\/scss\/modules/],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ts | tsx)/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /.(css|scss)$/,
        include: [/client\/scss\/modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            },
          },
          'sass-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
}