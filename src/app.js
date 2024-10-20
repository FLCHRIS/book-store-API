import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoutes)

export default app
