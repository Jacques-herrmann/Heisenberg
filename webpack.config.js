const path = require('path') // path resolution
const webpack = require('webpack')

let config = {
    entry: '.src/main.js', // entrypoint
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist',
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    devServer: {
        noInfo: true, // Hide running information from terminal
    },
    module: { // loader list
        rules: [{ // resolve .vue file with vue-loader
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    }
}
module.exports = config