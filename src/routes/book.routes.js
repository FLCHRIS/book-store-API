import verifyToken from '../middlewares/verifyToken.middlewares'
import * as controller from '../controllers/book.controllers'
import fileUpload from 'express-fileupload'
import { Router } from 'express'

const router = Router()

router.get('', controller.getBooks)
router.get('/:id', controller.getBook)
router.post(
	'',
	verifyToken,
	fileUpload({ useTempFiles: true, tempFileDir: './tmp' }),
	controller.createBook,
)
router.patch('/:id', verifyToken, controller.updateBook)

export default router
