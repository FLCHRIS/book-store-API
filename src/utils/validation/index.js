export const isValidEmail = (email) => {
	const regex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,}$/
	return regex.test(email)
}
