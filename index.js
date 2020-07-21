// const http = require('http')
// const fs = require('fs')
// const https = require('https')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const compress = require('compression')
const cors = require('cors')

const app = express(cors())

require('dotenv').config()

const logger = require('./lib/logger')
const errorHandler = require('./lib/errorHandler')
const corsMiddleware = require('./lib/cors')

const plantRouter = require('./routes/plant')

// Global middlewares
app.use(logger)
app.use(compress())
app.use(bodyParser.json())
app.use(corsMiddleware)

app.use('/plant', plantRouter)

app.use('*', () => {
  throw new Error('wrong')
})

// Error handler
app.use(errorHandler)

const makeServer = () => {
  return http.createServer(app)
  // const isProd = process.env.NODE_ENV === 'production'
  // if (isProd) {
  //   return http.createServer(app)
  // } else {
  //   const options = {
  //     key: fs.readFileSync( process.env.HTTPS_KEY ),
  //     cert: fs.readFileSync( process.env.HTTPS_CERT )
  //   }
  //   return https.createServer(options, app)

  // }
}

const server = makeServer()

const { PORT = 9000 } = process.env
server.listen(PORT, () => console.log(`Listening on ${PORT}`))
