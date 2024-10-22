import prisma from '../database'
import { uploadImage, deleteImage } from '../cloudinary'
import deleteTempFile from '../utils/tempFile'

export const getBooks = async (filters, page, size) => {
	try {
		const skip = (page - 1) * size
		const take = size

		const books = await prisma.book.findMany({
			skip,
			take,
			where: filters,
			select: {
				id: true,
				title: true,
				author: true,
				publisher: true,
				year: true,
				price: true,
				stock: true,
				description: true,
				genre: true,
				image: true,
			},
		})

		const totalBooks = await prisma.book.count({ where: filters })

		return {
			message: 'Books obtained successfully',
			status: 200,
			data: {
				books,
			},
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(totalBooks / size),
			},
		}
	} catch (error) {
		console.error(error)
		return {
			message: 'Error obtaining books',
			status: 500,
			data: { books: [] },
			pagination: null,
		}
	}
}

export const getBook = async (id) => {
	try {
		const book = await prisma.book.findUnique({
			where: { id },
			select: {
				id: true,
				title: true,
				author: true,
				publisher: true,
				year: true,
				price: true,
				stock: true,
				description: true,
				genre: true,
				image: true,
			},
		})

		if (!book) {
			return {
				message: 'Book not found',
				status: 404,
				data: { book: null },
			}
		}

		return {
			message: 'Book obtained successfully',
			status: 200,
			data: {
				book,
			},
		}
	} catch (error) {
		console.error(error)
		return {
			message: 'Error obtaining book',
			status: 500,
			data: { book: null },
		}
	}
}

export const createBook = async (book, imageUrl) => {
	let savedImage = null
	try {
		savedImage = await uploadImage(imageUrl, 'books')

		const savedBook = await prisma.book.create({
			data: {
				title: book.title,
				author: book.author,
				publisher: book.publisher,
				description: book.description,
				year: Number(book.year),
				price: Number(book.price),
				stock: Number(book.stock),
				genre: {
					connect: {
						id: Number(book.genreId),
					},
				},
				image: {
					create: {
						publicId: savedImage.public_id,
						url: savedImage.secure_url,
					},
				},
			},
			select: {
				id: true,
				title: true,
				author: true,
				publisher: true,
				year: true,
				price: true,
				stock: true,
				description: true,
				genre: true,
				image: true,
			},
		})

		return {
			message: 'Book created successfully',
			status: 200,
			data: {
				book: savedBook,
			},
		}
	} catch (error) {
		console.log(error)

		if (savedImage) {
			try {
				await deleteImage(savedImage.public_id)
			} catch (error) {
				console.log(`Error deleting image: ${error}`)
			}
		}

		return {
			message: 'Error creating book',
			status: 500,
			data: { book: null },
		}
	} finally {
		await deleteTempFile(imageUrl)
	}
}
