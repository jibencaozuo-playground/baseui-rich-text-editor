const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: './src/components/Editor/index.ts',
  output: {
    path: path.resolve('dist'),
    filename: 'Editor.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.svg'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.npm.json'
          },
        }],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'sass-loader'
        ],
      },
      {
        test: /\.svg$/,
        use: ['svg-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
