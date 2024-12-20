# Book Store API

## Requirements

- Docker
- Cloudinary

## Installation

1. Clone the repository
   ```bash
    git clone https://github.com/FLCHRIS/book-store-API.git
    cd book-store-API
   ```
2. Configure environment variables.
   
   Make sure you have your **Cloudinary** account set up, as you'll need the credentials to add to your `.env` file.

   Create a `.env` file in the root directory of the project and add the following environment variables:
   ```env
    PORT=3000
    JWT_SECRET="7li?HiEmWLSg-PEF"

    MYSQL_ROOT_PASSWORD=uehyst65
    MYSQL_DATABASE=bookstore

    DATABASE_URL="mysql://root:uehyst65@db:3306/bookstore"

    CLOUDINARY_CLOUD_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET=""
   ```
   Make sure to replace the values for `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` with your Cloudinary account credentials.

3. Build the application

   Use Docker Compose to build the application.
   ```bash
    docker-compose up -d --build
   ```
   This will start the containers defined in your docker-compose.yml file. Ensure there are no errors during this step.

4. Run Prisma Migrations

   Once your application is running in Docker, you'll need to run the Prisma migrations. Follow these steps:
   ```bash
    docker-compose exec app pnpm prisma migrate deploy
   ```
   This command will do the following:

   - This command applies the migrations to the database.
   - It will simply synchronize your database with the already existing migrations.

   If you want to generate new migrations, use the following command:
   ```bash
    docker-compose exec app pnpm prisma migrate dev --name init
   ```

5. Generate the Prisma Client

   After applying the migrations, you need to generate the Prisma Client so your application can interact with the database. Use the following command:
   ```bash
    docker-compose exec app pnpm prisma generate
   ```
   This command will generate the Prisma Client, which will be used in your application to perform database queries.

6. Run the Application

   Finally, you can run your application. If you're using pnpm, the following command will start your application in development mode:
   ```bash
    docker-compose exec app pnpm run dev
   ```
   This should start your server on the port you specified (3000 in this case).

## Commands

- `docker-compose up -d --build`: Build the image.
- `docker-compose up -d`: Start the image.
- `docker-compose down`: Stop the image.
- `docker-compose exec db mysql -u root -p`: Connect to the database.
- `docker-compose exec app pnpm run dev`: Start the server in development mode.
- `docker-compose exec app pnpm prisma migrate dev --name init`: Create a new migration.
- `docker-compose exec app pnpm prisma migrate deploy`: Apply existing migrations to the database.
- `docker-compose exec app pnpm prisma generate`: Generate the Prisma Client.
- `docker-compose exec app pnpm biome format --write .\your\path\file\here`: Format your code.
- `docker-compose exec app pnpm biome lint --write .\your\path\file\here`: Lint your code.
