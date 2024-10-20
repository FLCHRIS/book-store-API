import bcrypt from 'bcryptjs'

export const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	return hash
}

export const decryptPassword = async (password, hash) => {
	const isMatch = await bcrypt.compare(password, hash)
	return isMatch
}
