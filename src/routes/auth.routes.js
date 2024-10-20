import * as controllers from '../controllers/auth.controllers'
import { Router } from 'express'

const router = Router()

router.post('/sign-up', controllers.signUp)
router.post('/log-in', controllers.logIn)
router.post('/log-out', controllers.logOut)

export default router
