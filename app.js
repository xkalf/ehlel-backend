const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const AuthRoute = require('./routes/auth/auth.router')
const ProductRoute = require('./routes/product/product.router')
const ProductMonRoute = require('./routes/productmon/productmon.router')
const CategoryRoute = require('./routes/category/category.router')
const CartRoute = require('./routes/cart/cart.router')
const UserRoute = require('./routes/user/user.router')

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use('/', AuthRoute)
app.use('/product', ProductRoute)
app.use('/productmon', ProductMonRoute)
app.use('/category', CategoryRoute)
app.use('/cart', CartRoute)
app.use('/user', UserRoute)

module.exports = app
