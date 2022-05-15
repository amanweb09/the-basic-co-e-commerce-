const express = require('express')
const app = express()
const PORT = process.env.PORT || 3100

const server = require('http').createServer(app)

const path = require('path')
const views_path = path.join(__dirname, './templates/views')
const static_path = path.join(__dirname, './public')

app.set('view engine', 'ejs')
app.set('views', views_path)

app.use(express.static(static_path))

app.use(require('./router/routes'))

server
    .listen(PORT, () => console.log(`Listening server on port ${PORT}!`))