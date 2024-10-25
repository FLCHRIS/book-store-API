import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import seedGenre from './seed/genre.seed'

import authRoutes from './routes/auth.routes'
import bookRoutes from './routes/book.routes'
import orderRoutes from './routes/order.routes'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

seedGenre()

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/orders', orderRoutes)

export default app
