const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const mongoUrl = process.env.MONGO_URL
// enable findByIdAndUpdate without deprication warning:
//mongoose.set('useFindAndModify', false)

mongoose
  .connect(mongoUrl)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => {
    console.log(`MongoDB connection Error: ${err.message}`)
  })

// to ignore warning: DeprecationWarning: collection.ensureIndex is deprecated
//mongoose.set('useCreateIndex', true)

// middlewares
app.use(morgan('tiny'))
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())

// Import routes
const recipesRoutes = require('./api/routes/recipes')
const commentsRoutes = require('./api/routes/comments')
const usersRoutes = require('./api/routes/users')

app.use('/recipes', recipesRoutes)
app.use('/comments', commentsRoutes)
app.use('/users', usersRoutes)

// handle & forward reqest errors
if (process.env.NODE_ENV === 'development') {
  app.use((res, req, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
  })
  // get error
  app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
      error: {
        message: error.message
      }
    })
  })
}

// Production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'))

  // handle & forward reqest errors
  app.use((error, req, res, next) => {
    res.status(err.statusCode || 500).json({
      status: error.status,
      message: error.message
    })
  })
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server is running on port ${port}`))
