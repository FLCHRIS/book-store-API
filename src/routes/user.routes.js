import verifyToken from '../middlewares/verifyToken.middlewares'
import verifyAdmin from '../middlewares/verifyAdmin.middlewares'
import * as controllers from '../controllers/user.controllers'
import { Router } from 'express'

const router = Router()

router.delete('/:id', verifyToken, verifyAdmin, controllers.deleteUser)


export default router
