const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = webpackMerge.merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),// 压缩js
            new OptimizeCssAssetsPlugin({ // 压缩css
                assetNameRegExp:/\.css$/g, // 正则表达式，用于匹配需要优化或者压缩的资源名。默认值是/.css$/g
                cssProcessor:require("cssnano"), // 用于压缩和优化CSS 的处理器，默认是 cssnano.
                cssProcessorPluginOptions:{
                    preset:['default', { discardComments: { removeAll:true } }] //discardComments 去除注释
                },
                canPrint:true // 表示插件能够在console中打印信息，默认值是true
            })
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            cacheGroups: {
                framework: {
                    test: "framework",
                    name: "framework",
                    enforce: true
                },
                vendors: {
                    priority: -10,
                    test: /node_modules/,
                    name: "vendor",
                    enforce: true,
                },
            }
        }
    },
    output: {
        // publicPath: './test',
        filename: 'js/[name].[chunkhash:8].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: 'body',
            minify: {
                removeComments: true, // 去除注释
                // collapseWhitespace: true, //去除空格
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        }),
        new CleanWebpackPlugin()
    ]
});
