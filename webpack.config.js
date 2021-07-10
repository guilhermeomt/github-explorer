const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const reactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
  },
  plugins: [
    isDevelopment && new reactRefreshWebpackPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean),
          }
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader', 'sass-loader'],
      }
    ]
  }
};