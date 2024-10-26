import * as controller from '../controllers/favorite.controllers'
import verifyToken from '../middlewares/verifyToken.middlewares'
import { Router } from 'express'

const router = Router()

router.get('', verifyToken, controller.getFavorites)
router.post('', verifyToken, controller.createFavorite)
router.delete('/:bookId', verifyToken, controller.deleteFavorite)

export default router
