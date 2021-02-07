const webpackMerge = require('webpack-merge')
const common = require('./webpack.common.js')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // // 抽取css代码
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = webpackMerge.merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                sourceMap: false,
                extractComments: false
            }), // 压缩js
            new OptimizeCssAssetsPlugin({
                // 压缩css
                assetNameRegExp: /\.css$/g, // 正则表达式，用于匹配需要优化或者压缩的资源名。默认值是/.css$/g
                cssProcessor: require('cssnano'), // 用于压缩和优化CSS 的处理器，默认是 cssnano.
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }] // discardComments 去除注释
                },
                canPrint: true // 表示插件能够在console中打印信息，默认值是true
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                framework: {
                    test: 'framework',
                    name: 'framework',
                    enforce: true
                },
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    },
    output: {
        // publicPath: './test',
        filename: 'js/[name].[hash].bundle.js',
        chunkFilename: 'js/[name].[chunkhash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css'
        }),
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin()
    ]
})
