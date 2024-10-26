import verifyToken from '../middlewares/verifyToken.middlewares'
import * as controller from '../controllers/order.controllers'
import { Router } from 'express'

const router = Router()

router.get('', verifyToken, controller.getOrders)
router.post('', verifyToken, controller.createOrder)
router.get('/:id', verifyToken, controller.getOrder)
router.put('/:id/complete', verifyToken, controller.completeOrder)
router.patch('/:id/cancel', verifyToken, controller.cancelOrder)

export default router
