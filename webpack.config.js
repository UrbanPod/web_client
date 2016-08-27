module.exports = {  
  entry: './src/index.ts',
  output: {
    filename: './dist/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.html']
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}