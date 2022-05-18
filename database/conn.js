const { connect } = require('mongoose')

module.exports = function () {
    const connection = connect(process.env.LOCAL_DB_URL)

    if (connection) {
        console.log('db connected successfully ...');
        return;
    }
}

