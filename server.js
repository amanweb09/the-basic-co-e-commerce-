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
const eventEmitter = require('events')
const emitter = new eventEmitter()

app.set('view engine', 'ejs')
app.set('views', views_path)
app.set('emitter', emitter)

const session = require('express-session')
const flash = require('connect-flash')

const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');

app.use(cookieParser(process.env.COOKIE_SECRET))
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

app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})
app.use(flash())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(static_path))
app.use(require('express-fileupload')({ useTempFiles: true }))


app.use(require('./router/routes'))
app.use('/admin', require('./router/admin'))
app.use('*', (req, res) => { return res.status(404).render('404') })

const io = require('socket.io')(server)
server
    .listen(PORT, () => console.log(`Listening server on port ${PORT}!`))

io.on('connection', (socket) => {

    socket.on('join-user', ({ orderId }) => {
        socket.join(orderId)
    })

    emitter.on('status_updated', ({ status, orderId }) => {
        socket
            .to(orderId)
            .emit('status_updated', { status })
    })
})