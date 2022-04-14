const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const AuthRoute = require('./routes/auth')
const ProductRoute = require('./routes/product')
const CategoryRoute = require('./routes/category')
const ProductMonRoute = require('./routes/productmon')

const app = express()
dotenv.config()

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err))

app.use(express.json())
app.use('/api/auth', AuthRoute)
app.use('/api/product', ProductRoute)
app.use('/api/productmon', ProductMonRoute)
app.use('/api/category', CategoryRoute)

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running')
})
