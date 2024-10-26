import verifyToken from '../middlewares/verifyToken.middlewares'
import * as controller from '../controllers/order.controllers'
import { Router } from 'express'

const router = Router()

router.get('', verifyToken, controller.getOrders)
router.post('', verifyToken, controller.createOrder)
router.post('/:id/complete', verifyToken, controller.completeOrder)
// TODO: Add routes for cancel order

export default router
