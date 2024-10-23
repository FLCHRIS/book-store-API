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

	const formattedBook = {
		...book,
		year: Number(book.year),
		price: Number(book.price),
		stock: Number(book.stock),
		genreId: Number(book.genreId),
	}

	const { status, message, data } = await service.createBook(
		formattedBook,
		image.tempFilePath,
	)

	return res.status(status).json({ message, data })
}

export const updateBook = async (req, res) => {
	const { id } = req.params
	const book = req.body

	if (Number(id) < 1) {
		return res.status(400).json({ message: 'Invalid id' })
	}

	const formattedBook = {
		...book,
		year: book.year ? Number(book.year) : undefined,
		price: book.price ? Number(book.price) : undefined,
		stock: book.stock ? Number(book.stock) : undefined,
		genreId: book.genreId ? Number(book.genreId) : undefined,
	}

	const { status, message, data } = await service.updateBook(
		Number(id),
		formattedBook,
	)

	return res.status(status).json({ message, data })
}

export const updateBookImage = async (req, res) => {
	const { id } = req.params
	const image = req.files?.image

	if (Number(id) < 1) return res.status(400).json({ message: 'Invalid id' })
	if (!image) return res.status(400).json({ message: 'Image not provided' })

	const { status, message, data } = await service.updateBookImage(
		Number(id),
		image.tempFilePath,
	)

	return res.status(status).json({ message, data })
}
