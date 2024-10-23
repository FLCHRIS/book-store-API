import jwt from 'jsonwebtoken'

export const generateToken = (payload) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: 86400,
	})
	return token
}

export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    return { error: false, decoded }
  } catch (error) {
    return { message: 'Token inválido.', error: true }
  }
}
