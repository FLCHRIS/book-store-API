import * as service from '../services/order.services'

export const createOrder = async (req, res) => {
	const { bookId, quantity, userId } = req.body

	if (!bookId || !quantity || !userId) {
		return res.status(400).json({ message: 'Missing parameters' })
	}

	const { status, message, data } = await service.createOrder(
		Number(bookId),
		Number(quantity),
		Number(userId),
	)

	res.status(status).json({ message, data })
}
