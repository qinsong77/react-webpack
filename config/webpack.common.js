const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackBar = require('webpackbar')

const resolve = dir => path.resolve(__dirname, dir)
function getCssLoaders(importLoaders = 1) {
    return [
        process.env.NODE_ENV !== 'production'
          ? 'style-loader'
          : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                // CSS modules 比较耗性能，默认就是禁用的
                modules: false,
                // 开启 sourcemap
                sourceMap: true,
                // 指定在 CSS loader 处理前使用的 loader 数量
                importLoaders: importLoaders
            },
        },
        {
            loader: 'postcss-loader',
            options: { sourceMap: true },
        },
    ];
}

module.exports = {
    entry: {
        app: './src/index.js',
        framework: ['react','react-dom']
    },
    output: {
        filename: 'js/bundle.js',
        path: resolve('../dist')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        // 设置别名
        alias: {
            '@': resolve('../src'),// 这样配置后 @ 可以指向 src 目录
            '_c': resolve('../src/components'),
            '_api': resolve('../src/api')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: getCssLoaders(1),
            },
            {
                test: /\.scss|sass$/,
                use: [
                  // postcss-loader + sass-loader 两个 loader，所以 importLoaders 应该设置为 2
                    ...getCssLoaders(3),
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                    { loader: 'sass-resources-loader',
                        options: {
                            sourceMap: true,
                            resources: [
                                resolve('../src/styles/variable.scss'),
                                resolve('../src/styles/mixins.scss')
                            ]
                        }
                    }
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 图片低于 10k 会被转换成 base64 格式的 dataUrl
                            limit: 10 * 1024,
                            // [hash] 占位符和 [contenthash] 是相同的含义
                            // 都是表示文件内容的 hash 值，默认是使用 md5 hash 算法
                            name: '[name].[contenthash].[ext]',
                            // 保存到 images 文件夹下面
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        new FriendlyErrorsPlugin(),
        new WebpackBar()
    ]
}
