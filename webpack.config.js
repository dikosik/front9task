// webpack.config.js
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const commonConfig = {
  mode: 'development', // Set mode to 'development'
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Update the regex to match both .js and .jsx files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}

module.exports = [
  {
    ...commonConfig,
    target: 'node',
    entry: './src/server.jsx',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
    },
    plugins: [
      new NodemonPlugin({
        watch: path.resolve(__dirname, './dist'),
        externalsPresets: { node: true }
      })
    ]
  },
  {
    ...commonConfig,
    target: 'web',
    entry: './src/client.jsx',
    output: {
      path: path.resolve(__dirname, './public'),
      filename: 'index.js',
    },
    externals: [nodeExternals()]
  }
];