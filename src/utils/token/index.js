import jwt from 'jsonwebtoken'

export const generateToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: 86400,
	})
	return token
}
