import * as service from '../services/auth.services'
import { isValidEmail } from '../utils/validation'

export const signUp = async (req, res) => {
	const { firstName, lastName, email, password } = req.body

	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
	if (!isValidEmail(email)) {
		return res.status(400).json({ message: 'Invalid email' })
	}

	const { status, message } = await service.signUp({
		firstName,
		lastName,
		email,
		password,
	})

	return res.status(status).json({ message })
}

export const signUpAdmin = async (req, res) => {
	const { firstName, lastName, email, password, role } = req.body

	if (!firstName || !lastName || !email || !password || !role) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
	if (!isValidEmail(email)) {
		return res.status(400).json({ message: 'Invalid email' })
	}

	const { status, message } = await service.signUp(
		{ firstName, lastName, email, password },
		role,
	)

	return res.status(status).json({ message })
}

export const logIn = async (req, res) => {
	const user = req.body

	if (!user.email || !user.password) {
		return res.status(400).json({ message: 'Missing required fields' })
	}
	if (!isValidEmail(user.email)) {
		return res.status(400).json({ message: 'Invalid email' })
	}

	const { status, error, message, token, data } = await service.logIn(user)

	if (error) {
		return res.status(status).json({ message, data })
	}

	return res
		.status(status)
		.cookie('token', token, {
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 86400000,
		})
		.json({ message, data })
}

export const logOut = async (req, res) => {
	return res
		.status(200)
		.clearCookie('token')
		.json({ message: 'User logged out successfully' })
}

export const deleteAccount = async (req, res) => {
	const { password } = req.body
	const user = req.user

	if (!password) {
		return res.status(400).json({ message: 'Missing required fields' })
	}

	const { status, error, message } = await service.deleteAccount({
		email: user.email,
		password,
	})

	if (error) {
		return res.status(status).json({ message })
	}

	return res.status(status).clearCookie('token').json({ message })
}
