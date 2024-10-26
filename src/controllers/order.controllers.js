import * as service from '../services/order.services'

export const getOrders = async (req, res) => {
	const { status } = req.query
	const user = req.user

	const filters = { userId: Number(user.id) }

	if (status) filters.status = status

	const { message, status: statusCode, data } = await service.getOrders(filters)

	return res.status(statusCode).json({ message, data })
}

export const createOrder = async (req, res) => {
	const { bookId, quantity } = req.body
	const user = req.user

	if (!bookId || !quantity) {
		return res.status(400).json({ message: 'Missing parameters' })
	}

	const { status, message, data } = await service.createOrder(
		Number(bookId),
		Number(quantity),
		Number(user.id),
	)

	res.status(status).json({ message, data })
}
