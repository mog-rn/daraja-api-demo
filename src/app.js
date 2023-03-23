// App.js - Entry point for the application

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')

const app = express()
const winston = require('winston')
const { authorize } = require('./handlers/auth')
const { payBiz } = require('./handlers/c2b')

// Port config
const port = process.env.PORT || 3000

// Handles the logging structure of the app
expressWinston = require('express-winston')

// 
app.use(bodyParser.json())
app.use(cookieParser())

// routes
app.post('/auth', authorize)
app.post('/pay', payBiz)

// Logger setup
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)  
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red). Enabling this will also enable the expressFormat option
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Daraja-2.0-Demo!')
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})