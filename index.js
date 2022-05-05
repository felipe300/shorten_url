import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import './config/connectDB.js'
import authRouter from './routes/auth.route.js'
import linkRouter from './routes/link.route.js'
import redirectRouter from './routes/redirect.route.js'

const app = express()
const apiVersion = '/api/v1'

// only for development ligin/token testing
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
