const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {

  entry: "./src/index.js",

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist')
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ],
  
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', {targets: "defaults"}],
              ['@babel/preset-env', {targets: "defaults"}]
            ]
          }
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  
}