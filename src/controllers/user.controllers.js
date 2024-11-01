import * as service from '../services/user.services'
import { isValidEmail } from '../utils/validation'

export const getUsers = async (req, res) => {
	const { role, email, page = 1, size = 10 } = req.query

	const filters = {}

	if (role) filters.role = role
	if (email) filters.email = { contains: String(email) }

	const { message, status, data, pagination } = await service.getUsers(
		filters,
		Number(page),
		Number(size),
	)

	return res.status(status).json({ message, data, pagination })
}

export const getUser = async (req, res) => {
	const { id } = req.params

	const { message, status, data } = await service.getUser(Number(id))

	return res.status(status).json({ message, data })
}

export const createUser = async (req, res) => {
	const { firstName, lastName, email, password } = req.body

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
	if (!isValidEmail(email)) {
		return res.status(400).json({ message: 'Invalid email' })
	}

	const { status, message, data } = await service.createUser({
		firstName,
		lastName,
		email,
		password,
	})

	return res.status(status).json({ message, data })
}

export const deleteUser = async (req, res) => {
	const { id } = req.params

	const { message, status } = await service.deleteUser(Number(id))

	return res.status(status).json({ message })
}
