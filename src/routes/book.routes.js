import verifyToken from '../middlewares/verifyToken.middlewares'
import verifyAdmin from '../middlewares/verifyAdmin.middlewares'
import * as controller from '../controllers/book.controllers'
import fileUpload from 'express-fileupload'
import { Router } from 'express'

const router = Router()

router.get('', controller.getBooks)
router.get('/:id', controller.getBook)
router.post(
	'',
	verifyToken,
	verifyAdmin,
	fileUpload({ useTempFiles: true, tempFileDir: './tmp' }),
	controller.createBook,
)
router.patch('/:id', verifyToken, verifyAdmin, controller.updateBook)
router.patch(
	'/:id/image',
	verifyToken,
	verifyAdmin,
	fileUpload({ useTempFiles: true, tempFileDir: './tmp' }),
	controller.updateBookImage,
)

export default router
