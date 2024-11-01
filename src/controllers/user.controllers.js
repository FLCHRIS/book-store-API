import * as services from '../services/user.services'

export const deleteUser = async (req, res) => {
  const { id } = req.params

  const { message, status } = await services.deleteUser(Number(id))

  return res.status(status).json({ message })
}
