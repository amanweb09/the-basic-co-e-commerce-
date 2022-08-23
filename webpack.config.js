const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV || "production",
    entry: ['./public/js/index.js', './public/js/order.js'],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './public/js'),
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.css\.css$/,
    //             use: [CssMinimizerPlugin.loader, 'css-loader']
    //         }
    //     ]
    // },
    // optimization: {
    //     minimizer: [
    //         new CssMinimizerPlugin()
    //     ]
    // }
}