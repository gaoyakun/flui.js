const Webpack = require('webpack');
const Merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BasicWebpackConfig = require('./webpack.flui.base.js');

module.exports = Merge(BasicWebpackConfig,{
  devtool: false,
  mode: 'production',
  optimization: {
    concatenateModules: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
          warnings: false
      },
      sourceMap: false,
      parallel: true
    }),
    new Webpack.HashedModuleIdsPlugin()
  ]
});