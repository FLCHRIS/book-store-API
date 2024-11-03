import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import seedGenre from './seed/genre.seed'

import authRoutes from './routes/auth.routes'
import bookRoutes from './routes/book.routes'
import userRoutes from './routes/user.routes'
import orderRoutes from './routes/order.routes'
import favoriteRoutes from './routes/favorite.routes'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

seedGenre()

app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/favorites', favoriteRoutes)

export default app
