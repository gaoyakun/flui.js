const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: Path.join(__dirname,'../test'),
  entry: {
    'test1': Path.resolve(__dirname,'../test/test1.ts')
  },
  output: {
    path: Path.join(__dirname,'../dist'),
    filename: 'test1.js',
    publicPath: './'
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['babel-loader','awesome-typescript-loader?configFileName=test/tsconfig.json']
    }]
  },
  plugins: [
      new HtmlWebpackPlugin({
          title: 'test1',
          template: 'index.html',
          filename: 'index.html',
          showErrors: true,
          inject: 'body'
      })
  ],
  resolve: {
    extensions: ['.d.ts','.ts','.js'],
  },
  devtool: '#source-map',
  mode: 'development',
  output: {
    publicPath: '/'
  },
  devServer: {
    hot: true,
    port: 9999,
    inline: true,
    clientLogLevel: 'error',
    index: 'index.html'
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new Webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    'flui': 'flui'
    }
};