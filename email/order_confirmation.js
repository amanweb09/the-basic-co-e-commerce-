module.exports = function ({ to, orderId, status, username }) {
    return `
        <h1> hello ${username}, order is ${status} </h1>
    
    `
}