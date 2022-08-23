const path = require('path');

module.exports = {
    mode: "development",
    entry: ['./public/js/index.js', './public/js/order.js', './public/js/email.js'],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, './public/js'),
    },
}