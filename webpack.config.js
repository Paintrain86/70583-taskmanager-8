const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public/js`)
  },
  devtool: `source-map`,
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    publicPath: `http://localhost:3131/`,
    hot: true
  }
};
