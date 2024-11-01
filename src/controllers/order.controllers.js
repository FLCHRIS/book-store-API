import * as service from '../services/order.services'

export const getOrders = async (req, res) => {
	const { status } = req.query
	const user = req.user

	const filters = { userId: Number(user.id) }

	if (status) filters.status = status

	const { message, status: statusCode, data } = await service.getOrders(filters)

	return res.status(statusCode).json({ message, data })
}

export const getOrder = async (req, res) => {
	const { id } = req.params

	const { status, message, data } = await service.getOrder(Number(id))

	return res.status(status).json({ message, data })
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
		user.role,
	)

	return res.status(status).json({ message, data })
}

export const completeOrder = async (req, res) => {
	const { id } = req.params
	const { amout } = req.body

	if (!amout) {
		return res.status(400).json({ message: 'Missing parameters' })
	}

	const { status, message, data } = await service.completeOrder(Number(id), Number(amout))

	return res.status(status).json({ message, data })
}

export const cancelOrder = async (req, res) => {
	const { id } = req.params

	const { status, message, data } = await service.cancelOrder(Number(id))

	return res.status(status).json({ message, data })
}
