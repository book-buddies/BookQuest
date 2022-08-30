const path = require ('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: ['./src/client/App.tsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build")
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    // match the output path
    static: {
      directory: path.resolve(__dirname, 'dist'),
      // match the output 'publicPath'
      publicPath: '/',
    },
    // enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    /**
     * proxy is required in order to make api calls to
     * express server while using hot-reload webpack server
     * routes api fetch requests from localhost:8080/api/* (webpack dev server)
     * to localhost:3000/api/* (where our Express server is running)
     */
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        // test: /\.jsx?/,
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
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
        test: /\.tsx?$/,
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