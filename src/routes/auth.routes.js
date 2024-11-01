import * as controllers from '../controllers/auth.controllers'
import verifyToken from '../middlewares/verifyToken.middlewares'
import verifyAdmin from '../middlewares/verifyAdmin.middlewares'
import { Router } from 'express'

const router = Router()

router.post('/sign-up', controllers.signUp)
router.post('/sign-up-admin', verifyToken, verifyAdmin, controllers.signUpAdmin)
router.post('/log-in', controllers.logIn)
router.post('/log-out', controllers.logOut)
router.delete('/delete-account', verifyToken, controllers.deleteAccount)

export default router
