import * as controller from '../controllers/book.controllers'
import { Router } from 'express'

const router = Router()

router.get('', controller.getBooks)
router.get('/:id', controller.getBook)

export default router
