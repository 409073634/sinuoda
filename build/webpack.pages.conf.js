var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var pages = require('../config/pages')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// var PrerenderSpaPlugin = require('prerender-spa-plugin')
// var { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.pages.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: Object.assign({}, ...pages.map(page => ({[page]: './src/app/' + page + '/entry.js'}))),
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.pages.productionSourceMap,
      extract: true
    }).concat(utils.fileLoaders())
  },
  devtool: config.pages.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.pages.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new BaseHrefWebpackPlugin({ baseHref: '/' }),
    // new PrerenderSpaPlugin(
    //   path.join(__dirname, '../dist'),
    //   [
    //     '/login',
    //   ], {
    //     ignoreJSErrors: true
    //   }
    // ),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: config.pages.productionSourceMap
    // }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.pages.index,
      template: 'index.html',
      inject: true,
      chunks: ['app', 'common', 'vendor', 'manifest'],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    ...pages.map(page => {
      return new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, `../dist/pages/${page}.html`),
        template: 'index.html',
        inject: true,
        chunks: [page, 'common', 'vendor', 'manifest'],
        chunksSortMode: 'dependency'
      })
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: ['app', ...pages]
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.pages.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.pages.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.pages.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.pages.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
