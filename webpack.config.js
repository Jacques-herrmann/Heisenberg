const path = require('path'); // path resolution
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
    mode: 'development',
    entry: './src/main.js', // entrypoint
    output: {
        path: path.resolve(__dirname, 'dist'),
        // publicPath: 'dist',
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.mjs', '.js', '.vue', '.css']
    },
    // devServer: {
	//     noInfo: true, // Hide runing informations from terminal
    // },
    module: { // loader list
        rules: [
            { // resolve .js file with babel
                test: /\.m?js$/,
                use: 'babel-loader'
            },
            { // resolve .vue file with vue-loader
                test: /\.vue$/,
                use: 'vue-loader'
            },
             {
              test: /\.css$/,
              loader: [
                'style-loader',
                'css-loader'
              ]
            },
            { // resolve stylus file with stylus-loader then css-loader then vue-loader
                test: /\.styl(us)?$/,
                loader: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [ // Vue and hot module plugin
        new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
module.exports = config;