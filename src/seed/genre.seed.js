import prisma from '../database'

const seedGenre = async () => {
  try {
    const genres = await prisma.genre.findMany();

    if (genres.length === 0) {
      await prisma.genre.createMany({
        data: [
          { name: 'Action' },
          { name: 'Drama' },
          { name: 'Fantasy' },
          { name: 'Horror' },
          { name: 'Romance' },
          { name: 'Thriller' },
          { name: 'Mystery' },
          { name: 'Science Fiction' },
        ]
      })
      console.log('Genres created successfully')
    }
  } catch (error) {
    console.error('Error creating genres', error);
  }
}

export default seedGenre
