const path = require('path');

module.exports = {
    mode: "development",
    entry: ['./public/js/index.js', './public/js/payment_client.js'],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './public/js'),
    },
}