import verifyToken from '../middlewares/verifyToken.middlewares'
import * as controller from '../controllers/order.controllers'
import { Router } from 'express'

const router = Router()

router.get('', verifyToken, controller.getOrders)
router.post('', verifyToken, controller.createOrder)

export default router
