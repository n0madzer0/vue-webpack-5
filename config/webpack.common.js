const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');
const {
  VueLoaderPlugin
} = require('vue-loader');

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + '/main.js'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [{
        from: paths.public,
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store'],
        },
        noErrorOnMissing: true,
      }, ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'Webpack 5 Learning',
      // favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/index.html', // template file
      filename: 'index.html', // output file
    }),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      formatter: 'table',
    }),

    // Prettier configuration
    new PrettierPlugin(),

    // Vue Loader
    new VueLoaderPlugin()
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // Vue files
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },

      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};