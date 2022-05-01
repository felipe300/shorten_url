import express from 'express'
import 'dotenv/config'

import './config/connectDB.js'
import authRouter from './routes/auth.route.js'

const app = express()
const port = process.env.PORT || 5000
const apiVersion = '/api/v1'

app.use(express.json())
app.use(`${apiVersion}/auth`, authRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port} 🔥`)
})
