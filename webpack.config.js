const path = require('path');

module.exports = {
  output: {
    filename: 'index.js',
    library: 'grillCore',
    libraryTarget: 'umd'
  },
  entry: ['./src/index.ts'],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname)],
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.test.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMaps: true,
            presets: ['@babel/preset-typescript']
          }
        }
      }
    ]
  }
};
