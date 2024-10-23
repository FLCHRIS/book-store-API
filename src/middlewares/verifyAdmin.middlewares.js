import { validateToken } from '../utils/token'

const verifyAdmin = (req, res, next) => {
	try {
		const token = req.cookies.token

		const { decoded } = validateToken(token)

		if (decoded.role !== 'ADMIN') {
			return res.status(403).json({ message: 'Access not authorized' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(400).json({ message: 'Cookie not provided' })
	}
}

export default verifyAdmin
