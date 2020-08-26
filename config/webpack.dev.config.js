const path = require('path');
const webpackMerge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge.merge(common, {
    devtool: 'eval-source-map',
    stats: 'minimal', // 只在发生错误时输出, minimal 只在发生错误或有新的编译时输出
    // output: {
    //     filename: 'js/[name].[hash:8].bundle.js',
    // },
    devServer: {
        historyApiFallback: true, // 处理刷新Cannot GET /xxx 报错
        contentBase: path.resolve(__dirname, '../dist'),
        open: true,
        port: 9000,
        compress: true,
        hot: true,
        host: '0.0.0.0',
        proxy: [{
            context: ['/api'],
            target: 'http://localhost:3000',
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: 'body',
            hash: false
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
});
