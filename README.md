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

   Create `.env` file in the root of the project and add the following variables:
   ```env
    PORT=3000
    JWT_SECRET="7li?HiEmWLSg-PEF"
    MONGO_URI=mongodb://db:27017/bookstore
    CLOUDINARY_CLOUD_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET=""
   ```
3. Start the application

   Use Docker Compose to build and run the application.
   ```bash
    docker-compose up -d --build
   ```
4. Visit http://localhost:3000 in your browser
5. Stop the application
   ```bash
    docker-compose down
   ```

## Commands

- `docker-compose up -d --build`: Start and build the application
- `docker-compose up -d`: Start the application
- `docker-compose down`: Stop the application

