import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import './config/connectDB.js'
import authRouter from './routes/auth.route.js'

const app = express()
const apiVersion = '/api/v1'

// only for development testing
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

app.use(`${apiVersion}/auth`, authRouter)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} 🔥`)
})
