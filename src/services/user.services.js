import prisma from '../database'
import { encryptPassword } from '../utils/encryption'

export const getUsers = async (filters, page, size) => {
	try {
		const skip = (page - 1) * size
		const take = size

		const users = await prisma.user.findMany({
			skip,
			take,
			where: filters,
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
				deletedAt: true,
			},
		})

		const totalUsers = await prisma.user.count({ where: filters })

		return {
			message: 'Users obtained successfully',
			status: 200,
			data: {
				users,
			},
			pagination: {
				currentPage: page,
				totalPages: Math.ceil(totalUsers / size),
			},
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error obtaining users',
			status: 500,
			data: { users: [] },
			pagination: null,
		}
	}
}

export const getUser = async (id) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
				deletedAt: true,
			},
		})

		if (!user) {
			return {
				message: 'User not found',
				status: 404,
				data: { user: null },
			}
		}

		return {
			message: 'User obtained successfully',
			status: 200,
			data: {
				user,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error obtaining user',
			status: 500,
			data: { user: null },
		}
	}
}

export const createUser = async (user) => {
	try {
		const userExists = await prisma.user.findUnique({
			where: {
				email: user.email,
			},
			select: {
				email: true,
			},
		})

		if (userExists) {
			return {
				message: 'Email already exists',
				status: 400,
				data: { user: null },
			}
		}

		const hash = await encryptPassword(user.password)

		const savedUser = await prisma.user.create({
			data: {
				...user,
				password: hash,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
				email: true,
				role: true,
				isActive: true,
				createdAt: true,
				updatedAt: true,
				deletedAt: true,
			},
		})

		return {
			message: 'User created successfully',
			status: 201,
			data: {
				user: savedUser,
			},
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error creating user',
			status: 500,
			data: { user: null },
		}
	}
}

export const deleteUser = async (id) => {
	try {
		const userExists = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				role: true,
			},
		})

		if (!userExists) {
			return {
				message: 'User not found',
				status: 404,
			}
		}
		if (userExists.role !== 'ADMIN') {
			return {
				message: 'You can only delete administrator accounts',
				status: 403,
			}
		}

		await prisma.user.delete({
			where: {
				id,
			},
		})

		return {
			message: 'User deleted successfully',
			status: 200,
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error deleting user',
			status: 500,
		}
	}
}
