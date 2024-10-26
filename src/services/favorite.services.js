import prisma from '../database'

export const getFavorites = async (userId, page, size) => {
	try {
		const skip = (page - 1) * size
		const take = size

		const favorites = await prisma.favorite.findMany({
			skip,
			take,
			where: {
				userId,
			},
			select: {
				id: true,
				book: {
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
					}
				}
			},
		})

		if (!favorites) {
			return {
				message: 'Favorites not found',
				status: 404,
				data: { favorites: [] },
			}
		}

		const totalFavorites = await prisma.favorite.count({
			where: {
				userId,
			},
		})

		return {
			message: 'Favorites retrieved successfully',
			status: 200,
			data: {
				favorites,
			},
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(totalFavorites / size),
			},
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error retrieving favorites',
			status: 500,
			data: { favorites: [] },
			pagination: null,
		}
	}
}

export const createFavorite = async (userId, bookId) => {
	try {
		const existingFavorite = await prisma.favorite.findUnique({
			where: {
				userId_bookId: {
					userId,
					bookId,
				},
			},
		})

		if (existingFavorite) {
			return {
				message: 'Book already favorited',
				status: 400,
				data: { favorite: null },
			}
		}

		const savedFavorite = await prisma.favorite.create({
			data: {
				userId,
				bookId,
			},
			select: {
				id: true,
				book: {
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
				},
			},
		})

		return {
			message: 'Book favorited successfully',
			status: 201,
			data: {
				favorite: savedFavorite,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error creating favorite',
			status: 500,
			data: { favorite: null },
		}
	}
}

export const deleteFavorite = async (userId, bookId) => {
	try {
		const existingFavorite = await prisma.favorite.findUnique({
			where: {
				userId_bookId: {
					userId,
					bookId,
				},
			},
		})

		if (!existingFavorite) {
			return {
				message: 'Book not favorited',
				status: 400,
				data: { favorite: null },
			}
		}

		await prisma.favorite.delete({
			where: {
				userId_bookId: {
					userId,
					bookId,
				},
			},
		})

		return {
			message: 'Book removed from favorites successfully',
			status: 200,
			data: {
				favorite: null,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error removing favorite',
			status: 500,
			data: { favorite: null },
		}
	}
}
