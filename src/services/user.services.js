import prisma from '../database'

export const deleteUser = async (id) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      }
    })

    if (!userExists) {
      return {
        message: 'User not found',
        status: 404,
      }
    }

    await prisma.user.delete({
      where: {
        id,
      },
    })

    return {
      message: 'User deleted successfully',
      status: 200,
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'Error deleting user',
      status: 500,
    }
  }
}
