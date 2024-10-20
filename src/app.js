import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import seedGenre from './seed/genre.seed'

import authRoutes from './routes/auth.routes'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

seedGenre()

app.use('/api/auth', authRoutes)

export default app
