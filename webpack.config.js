const path = require("path")
const fs = require("fs")
const HtmlWebpackPlugin = require("html-webpack-plugin")

// Look for .html files
const htmlFiles = []
const directories = ["src"]
while (directories.length > 0) {
  const directory = directories.pop()
  const dirContents = fs
    .readdirSync(directory)
    .map(file => path.join(directory, file))

  htmlFiles.push(...dirContents.filter(file => file.endsWith(".html")))
  directories.push(
    ...dirContents.filter(file => fs.statSync(file).isDirectory()),
  )
}

const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "development",
  entry: "./src/js/entrypoint.js",
  output: {
    path: __dirname + "/public",
    filename: "script.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    watchFiles: ["src/**/*"],
    compress: true,
    port: 8080,
    open: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    // Build a new plugin instance for each .html file found
    ...htmlFiles.map(
      htmlFile =>
        new HtmlWebpackPlugin({
          template: htmlFile,
          filename: htmlFile.replace(path.normalize("src/"), ""),
          inject: false,
        }),
    ),
  ],
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/ /* expressao regular = / /  , extensao arquivo terminada em ____$ */,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", //interpreta @import, url()...
          /* "sass-loader", */
        ],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              pngquant: {
                quality: [0.9, 0.95],
              },
            },
          },
        ],
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // Inline anything under 10kb
          },
        },
        generator: {
          filename: "images/[name]-[hash][ext]",
        },
      },
    ],
  },
}
