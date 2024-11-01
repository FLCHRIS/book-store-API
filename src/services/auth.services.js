import prisma from '../database'
import { generateToken } from '../utils/token'
import { encryptPassword, decryptPassword } from '../utils/encryption'

export const signUp = async (user, role = 'CUSTOMER') => {
	try {
		const emailExists = await prisma.user.findUnique({
			where: {
				email: user.email,
			},
		})

		if (emailExists) {
			return { message: 'Email already exists', status: 400 }
		}

		const hash = await encryptPassword(user.password)

		await prisma.user.create({
			data: {
				...user,
				password: hash,
				role,
			},
		})

		return {
			message: 'User created successfully',
			status: 201,
		}
	} catch (error) {
		console.log(error)
		return { message: 'Error signing in', status: 500 }
	}
}

export const logIn = async (user) => {
	try {
		const userExists = await prisma.user.findUnique({
			where: {
				email: user.email,
				isActive: true,
			},
		})

		if (!userExists) {
			return {
				message: 'User not found',
				status: 404,
				error: true,
				data: { user: null },
			}
		}

		const isMatch = await decryptPassword(
			user.password,
			userExists.password,
		)

		if (!isMatch) {
			return {
				message: 'Incorrect password',
				status: 401,
				error: true,
				data: { user: null },
			}
		}

		const token = generateToken({
			id: userExists.id,
			email: userExists.email,
			role: userExists.role,
		})

		const { password: _, ...newUser } = userExists

		return {
			message: 'User logged in successfully',
			status: 200,
			error: false,
			token: token,
			data: { user: newUser },
		}
	} catch (error) {
		console.log(error)
		return {
			message: 'Error signing in',
			status: 500,
			error: true,
			data: { user: null },
		}
	}
}
