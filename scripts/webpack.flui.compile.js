const Path = require('path');

module.exports = {
  context: Path.join(__dirname,'../src'),
  entry: {
    'flui': Path.resolve(__dirname,'../src/index.ts')
  },
  output: {
    path: Path.join(__dirname,'../dist'),
    filename: '[name].js',
    publicPath: './',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['babel-loader','awesome-typescript-loader?configFileName=src/tsconfig.compile.json']
    }]
  },
  resolve: {
    extensions: ['.ts','.js'],
  }
};