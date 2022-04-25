const http = require('http')
const mongoose = require('mongoose')
const app = require('./app')

require('dotenv').config()

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URL)
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`)
  })
}

startServer()
