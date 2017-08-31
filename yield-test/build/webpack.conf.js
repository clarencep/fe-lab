const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
    context: resolve('.'),
    entry: {
        app: resolve("src/index.js")
    },
    output: {
        path: resolve("dist"),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js',
        // publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.css', '.less'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader',
                }),
                // loader: 'style-loader!css-loader',
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader', 'less-loader'],
                    fallback: 'style-loader',
                }),
                // loader: 'style-loader!css-loader!less-loader',
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    },
    plugins: [
        // extract css into its own file
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            filename: resolve('dist/index.html'),
            template: resolve('src/index.html.js'),
            inject: true,
            minify: {
                removeComments: false,
                collapseWhitespace: false,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([
            {context: resolve('assets'), from: '**/*', /*to dist, */}
        ])
    ]
}