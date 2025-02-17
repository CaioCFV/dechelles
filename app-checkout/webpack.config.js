module.exports = {
  mode: 'development',
  entry: {
    'checkout6-custom': './src/js/checkout6-custom.js',
    css: './src/scss/index.js'
  },
  output: {
    filename: `[name].js`,
    path: __dirname + '/checkout-ui-custom'
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '/',
              name: `[name].css`
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }
      }
    ]
  }
}
