const Path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
  context: Path.join(__dirname,'../src'),
  entry: {
    'flui': Path.resolve(__dirname,'../src/index.ts')
  },
  output: {
    path: Path.join(__dirname,'../dist'),
    filename: 'flui.js',
    publicPath: './',
    library: 'flui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: ['babel-loader','awesome-typescript-loader?configFileName=src/tsconfig.json']
    }]
  },
  plugins: [
    new DtsBundleWebpack({
      name: 'flui',
      main: Path.resolve(__dirname, '../src/index.d.ts'),
      baseDir: Path.resolve(__dirname, '../src'),
      out: Path.resolve(__dirname, "../dist/typings/flui/index.d.ts"),
      exclude: /.*\/internal\/.*/,
      removeSource: true
    })
  ],
  resolve: {
    extensions: ['.ts','.js']
  }
};