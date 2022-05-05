import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import cors from 'cors'

import './config/connectDB.js'
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'
import redirectRouter from './routes/redirect.route.js'

const app = express()
const apiVersion = '/api/v1'
const whiteList = [
  // Port for React http://127.0.0.1:3000
  process.env.ORIGIN1
]

app.use(cors({
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      return callback(null, origin)
    }
    return callback(new Error('Not allowed by CORS'))
  }
}))

// only for development login/token testing
// app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.use('/', redirectRouter)
app.use(`${apiVersion}/auth`, authRouter)
app.use(`${apiVersion}/links`, linkRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} 🔥`)
})
