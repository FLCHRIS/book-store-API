import verifyToken from '../middlewares/verifyToken.middlewares'
import * as controller from '../controllers/order.controllers'
import { Router } from 'express'

const router = Router()

router.post('', verifyToken, controller.createOrder)

export default router
