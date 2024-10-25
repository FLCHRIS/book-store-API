import prisma from '../database'

export const createOrder = async (bookId, quantity, userId) => {
	try {
		const book = await prisma.book.findUnique({
			where: {
				id: bookId,
			},
		})

		if (!book) {
			return {
				message: 'Book not found',
				status: 404,
				data: { order: null },
			}
		}

		let order = await prisma.order.findFirst({
			where: {
				userId,
				status: 'PENDING',
			},
			include: {
				orderItems: true,
			},
		})

		if (!order) {
			order = await prisma.order.create({
				data: {
					userId,
					totalAmount: 0,
					status: 'PENDING',
				},
			})
		}

		const orderItems = await prisma.orderItem.findFirst({
			where: {
				orderId: order.id,
				bookId,
			},
		})

		if (!orderItems) {
			await prisma.orderItem.create({
				data: {
					orderId: order.id,
					bookId,
					quantity,
					price: book.price,
				},
			})
		} else {
			await prisma.orderItem.update({
				where: {
					id: orderItems.id,
				},
				data: {
					quantity: orderItems.quantity + quantity,
				},
			})
		}

		const updatedOrder = await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				totalAmount: {
					increment: book.price * quantity,
				},
			},
		})

		return {
			message: 'Order created successfully',
			status: 200,
			data: { order: updatedOrder },
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error creating order',
			status: 500,
			data: { order: null },
		}
	}
}
