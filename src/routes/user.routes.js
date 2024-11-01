import verifyToken from '../middlewares/verifyToken.middlewares'
import verifyAdmin from '../middlewares/verifyAdmin.middlewares'
import * as controller from '../controllers/user.controllers'
import { Router } from 'express'

const router = Router()

router.get('', verifyToken, verifyAdmin, controller.getUsers)
router.post('', verifyToken, verifyAdmin, controller.createUser)
router.get('/:id', verifyToken, verifyAdmin, controller.getUser)
router.delete('/:id', verifyToken, verifyAdmin, controller.deleteUser)

export default router
