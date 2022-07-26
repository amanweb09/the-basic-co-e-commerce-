const { connect } = require('mongoose')

module.exports = function () {
    const connection = connect(process.env.CLOUD_DB_URL)

    if (connection) {
        console.log('cloud db connected successfully ...');
        return;
    }
}

