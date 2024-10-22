import fs from 'fs-extra'

const deleteTempFile = async (path) => {
	await fs.unlink(path)
}

export default deleteTempFile
