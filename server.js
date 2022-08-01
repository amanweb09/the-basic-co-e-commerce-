require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3100

const server = require('http').createServer(app)

const db = require('./database/conn')
db()

const path = require('path')
const views_path = path.join(__dirname, './templates/views')
const static_path = path.join(__dirname, './public')

app.set('view engine', 'ejs')
app.set('views', views_path)

const session = require('express-session')
const flash = require('connect-flash')

const MongoStore = require('connect-mongo');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 3
    },
    store: MongoStore.create({
        mongoUrl: process.env.CLOUD_DB_URL,
    })
}))
app.use(flash())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path))


app.use(require('./router/routes'))
app.use('/admin', require('./router/admin'))

server
    .listen(PORT, () => console.log(`Listening server on port ${PORT}!`))