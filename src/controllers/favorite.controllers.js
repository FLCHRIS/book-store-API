import * as service from '../services/favorite.services'

export const getFavorites = async (req, res) => {
	const { page = 1, size = 10 } = req.query
	const user = req.user

	const { message, status, data, pagination } = await service.getFavorites(
		Number(user.id),
		Number(page),
		Number(size),
	)

	return res.status(status).json({ message, data, pagination })
}

export const createFavorite = async (req, res) => {
	const { bookId } = req.body
	const user = req.user

  if (!bookId) {
    return res.status(400).json({ message: 'Book id not provided' })
  }

	const { status, message, data } = await service.createFavorite(
		Number(user.id),
		Number(bookId),
	)

	return res.status(status).json({ message, data })
}

export const deleteFavorite = async (req, res) => {
	const { bookId } = req.params
	const user = req.user

	const { status, message, data } = await service.deleteFavorite(
		Number(user.id),
		Number(bookId),
	)

	return res.status(status).json({ message, data })
}
