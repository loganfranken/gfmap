import 'webpack';
import path from 'path';

export default {
  entry: ['babel-polyfill', './public/script/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve('./public/script'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  }
};