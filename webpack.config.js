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
        extensions: ['.js', '.vue']
    },
    module: { // loader list
        rules: [
            { // resolve .js file with babel
                test: /\.js$/,
                loader: 'babel-loader'
            },
            { // resolve .vue file with vue-loader
                test: /\.vue$/,
                loader: 'vue-loader'
            },
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