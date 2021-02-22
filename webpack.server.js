const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');

module.exports = {
  entry: {
    main: './src/server.js'
  },

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('build/server'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },

  plugins: [
    new ReactLoadableSSRAddon({
      filename: 'assets-manifest.json',
      integrity: false,
      integrityAlgorithms: [ 'sha256', 'sha384', 'sha512' ],
      integrityPropertyName: 'integrity',
    }),
  ],
};
