import prisma from '../database'

export const getOrders = async (filters) => {
	try {
		const orders = await prisma.order.findMany({
			where: filters,
			include: {
				orderItems: {
					include: {
						book: {
							select: {
								id: true,
							},
						},
					},
				},
			},
		})

		if (!orders) {
			return {
				message: 'Orders not found',
				status: 404,
				data: { orders: [] },
			}
		}

		return {
			message: 'Orders retrieved successfully',
			status: 200,
			data: {
				orders,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error retrieving orders',
			status: 500,
			data: { orders: [] },
		}
	}
}

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

		if (book.stock < quantity) {
			return {
				message: 'Not enough stock available',
				status: 400,
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

export const completeOrder = async (orderId, amount) => {
	try {
		const order = await prisma.order.findUnique({
			where: { id: orderId },
			include: { orderItems: true },
		})

		if (!order || order.status !== 'PENDING') {
			return {
				message: 'Order not found or already completed',
				status: 404,
				data: { order: null },
			}
		}

		await prisma.payment.create({
			data: {
				orderId,
				amount,
				paidAt: new Date(),
			},
		})

		await Promise.all(
			order.orderItems.map((item) =>
				prisma.book.update({
					where: { id: item.bookId },
					data: { stock: { decrement: item.quantity } },
				}),
			),
		)

		const updatedOrder = await prisma.order.update({
			where: { id: order.id },
			data: { status: 'COMPLETED' },
		})

		return {
			message: 'Order completed successfully',
			status: 200,
			data: { order: updatedOrder },
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error completing order',
			status: 500,
			data: { order: null },
		}
	}
}
