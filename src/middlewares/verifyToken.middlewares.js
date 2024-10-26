import { validateToken } from '../utils/token'

const verifyToken = (req, res, next) => {
	try {
		const token = req.cookies.token

		if (!token) {
			return res.status(403).json({ message: 'Access not authorized' })
		}

		const { error, message, decoded } = validateToken(token)

		if (error) {
			return res.status(401).json({ message })
		}

		req.user = decoded

		return next()
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: 'Cookie not provided' })
	}
}

export default verifyToken
