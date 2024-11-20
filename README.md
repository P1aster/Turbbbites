# Turbbbites Monorepo: NestJS Backend + PostgreSQL (Dockerized) 
This repository contains a monorepo for a NestJS backend and a PostgreSQL database. The project is fully dockerized, using separate containers for the backend and database, and can be easily managed with a single `docker-compose.yml` file.

<br/><br/>

## 📂 Project Structure

```bash
project-root/
│
├── backend/ # NestJS backend application
│ ├── src/ # Source code for the backend
│ ├── package.json # Backend dependencies
│ ├── tsconfig.json # TypeScript configuration
│ ├── Dockerfile # Dockerfile for the backend
│ ├── .dockerignore # Docker ignore file for the backend
│ ├── .env.backend # Environment variables for the backend
│ └── ... (other backend files)
│
├── database/ # PostgreSQL database setup
│ ├── Dockerfile # (Optional) Dockerfile for custom Postgres configuration
│ ├── .env.database # Environment variables for the database
│ └── initdb.sql # SQL file to initialize the database (if needed)
│
├── docker-compose.yml # Single Docker Compose file for backend and database
└── README.md # This documentation
```

## 🛠️ Prerequisites

Before running the project, you need to have Docker and Docker Compose installed on your system. If you don't have Docker installed, follow the instructions below.

### 1. Install Docker

For Windows/macOS/Linux:

   * Go to the official Docker website: [Docker Download](https://www.docker.com/products/docker-desktop/).

   * Follow the installation instructions based on your operating system.

   * After installation, ensure Docker is running by opening a terminal and running:

```bash
docker --version
docker-compose --version
```

This should display the version of Docker and Docker Compose installed.



## 🛠️ Setup Instructions

### 1. Clone the Project
   ```bash
   git clone <repository-url>
   cd project-root
   ```

### 2. Set Up Environment Variables
   Create the `.env.backend` file in the `backend/` directory:

```bash

touch backend/.env.backend
```

Add the following variables (customize as needed):

```env
DB_HOST=database
DB_USER=postgres
DB_PASSWORD=postgres_password
DB_NAME=app_db
PORT=3000
```

Create the `.env.database` file in the `database/` directory:

```bash
touch .env.database
```
Add the following variables (customize as needed):
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=app_db
```
### 3. Build and Run Containers

Use Docker Compose to build and run the containers.

Development Mode:

```bash
docker-compose up --build
```

Production Mode:

Add a `docker-compose.prod.yml` file for production overrides, then run:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

### 4. Access the Application

* Backend: Visit the backend at `http://localhost:3000`.

* Database: PostgreSQL will be available on `localhost:5433`.


## 🐋 Docker Configuration

### 1. docker-compose.yml

This file orchestrates the backend and database services:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: nestjs-backend
    env_file:
      - ./backend/.env.backend
    ports:
      - "3000:3000"
    depends_on:
      - database
    networks:
      - app-network

  database:
    image: postgres:15
    container_name: postgres-db
    env_file:
      - ./database/.env.database
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
    driver: bridge
```

### 2. Dockerfile for Backend

```dockerfile
# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]
```

### 3. `.dockerignore` for Backend

The `.dockerignore` file in the `backend/` directory excludes unnecessary files from the Docker image:

```bash
node_modules
dist
.env.*
```


## 🛠️ How to Run for Development and Production

* Development Mode: 

```bash
docker-compose up --build
```
This command will:

Build the Docker images based on the `Dockerfile` in the `backend/` folder.
Create and start containers for both the backend and PostgreSQL database.
Expose the backend on `http://localhost:3000` and the PostgreSQL database on `localhost:5432`.

* Production Mode:

o deploy the app in production mode, you can create a` docker-compose.prod.yml` file (optional) for production-specific configurations, then run:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```




