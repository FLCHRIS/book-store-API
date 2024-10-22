import * as service from '../services/book.services'

export const getBooks = async (req, res) => {
	const { title, genreId, page = 1, size = 10 } = req.query

	const filters = {}

	if (title) filters.title = { contains: String(title) }
	if (genreId) filters.genreId = Number(genreId)

	const { message, status, data, pagination } = await service.getBooks(
		filters,
		Number(page),
		Number(size),
	)

	return res.status(status).json({ message, data, pagination })
}

export const getBook = async (req, res) => {
	const { id } = req.params

	if (Number(id) < 1) {
		return res.status(400).json({ message: 'Invalid id' })
	}

	const { message, status, data } = await service.getBook(Number(id))

	return res.status(status).json({ message, data })
}

export const createBook = async (req, res) => {
	const image = req.files?.image
	const book = req.body

	if (!image) {
		return res.status(400).json({ message: 'Image not provided' })
	}

	if (
		!book.title ||
		!book.author ||
		!book.publisher ||
		!book.year ||
		!book.price ||
		!book.stock ||
		!book.description ||
		!book.genreId
	) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	const { status, message, data } = await service.createBook(
		book,
		image.tempFilePath,
	)

	return res.status(status).json({ message, data })
}
