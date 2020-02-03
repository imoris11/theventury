const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, options) => ({
  entry: './src/js/index.js',
  devServer: {
    contentBase: "./dist",
    // disableHostCheck: true,
  },
  devtool: "source-map",
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets/img/",
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'assets/fonts/',
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-srcsets-loader",
          options: {
            attrs: [":src", ':srcset', ':href', ':poster']
          }
        }
      },
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: "body",
        filename: 'index.html'
      })
  ],
  output: {
    filename: "assets/js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  }
});