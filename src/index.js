import app from './app'

const startServer = async () => {
	const PORT = process.env.PORT || 3000
	
	app.listen(PORT, () => {
		console.log(`Server started on port ${PORT}`)
	})
}

startServer()
