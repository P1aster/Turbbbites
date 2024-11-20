# Turbbbites Monorepo: NestJS Backend + PostgreSQL (Dockerized) 
This repository contains a monorepo for a NestJS backend and a PostgreSQL database. The project is fully dockerized, using separate containers for the backend and database, and can be easily managed with a single docker-compose.yml file.

📂 Project Structure
bash
Copy code
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
│ └── init.sql # SQL file to initialize the database (if needed)
│
├── docker-compose.yml # Single Docker Compose file for backend and database
└── README.md # This documentation
🛠️ Setup Instructions

1. Clone the Project
   bash
   Copy code
   git clone <repository-url>
   cd project-root
2. Set Up Environment Variables
   Create the .env.backend file in the backend/ directory:

bash
Copy code
touch backend/.env.backend
Add the following variables (customize as needed):

env
Copy code

# .env.backend

DB_HOST=database
DB_USER=postgres
DB_PASSWORD=postgres_password
DB_NAME=app_db
PORT=3000
Create the .env.database file in the project root:

bash
Copy code
touch .env.database
Add the following variables (customize as needed):

env
Copy code

# .env.database

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=app_db 3. Build and Run Containers
Development Mode: Run the following command to start the containers in development mode:

bash
Copy code
docker-compose up --build
Production Mode: Run the following command to start the containers in production mode:

bash
Copy code
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build 4. Access the Application
Backend: The backend will be accessible at http://localhost:3000.
Database: PostgreSQL will be available on localhost:5432.
🐋 Docker Details

1. Docker Compose Configuration
   The docker-compose.yml file orchestrates both the backend and the database services.

yaml
Copy code
version: '3.8'

services:
backend:
build:
context: ./backend
dockerfile: Dockerfile
container_name: nestjs-backend
env_file: - ./backend/.env.backend
ports: - "3000:3000"
depends_on: - database
networks: - app-network

database:
image: postgres:15
container_name: postgres-db
env_file: - ./database/.env.database
volumes: - postgres-data:/var/lib/postgresql/data - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
ports: - "5432:5432"
networks: - app-network

volumes:
postgres-data:

networks:
app-network:
driver: bridge

2. Dockerfile for Backend
   The backend uses a custom Dockerfile for building the NestJS application.

dockerfile
Copy code

# Step 1: Use Node.js official image as a base image

FROM node:16-alpine

# Step 2: Set the working directory inside the container

WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json for dependency installation

COPY package\*.json ./

# Step 4: Install the dependencies

RUN npm install

# Step 5: Copy all the source code into the working directory

COPY . .

# Step 6: Build the application (Optional: if you're using TypeScript)

RUN npm run build

# Step 7: Expose the port the app will run on

EXPOSE 3000

# Step 8: Run the application in production mode

CMD ["npm", "run", "start:prod"] 3. .dockerignore for Backend
To ensure unnecessary files are not copied into the Docker image, include the following .dockerignore file:

bash
Copy code
node_modules
dist
.env.\* 4. Database Configuration
The database uses the official PostgreSQL image. Configuration is provided via .env.database.

env
Copy code
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=app_db
🚀 How to Run for Development and Production
Development Mode:
Automatically reloads the backend code on changes.
Command:
bash
Copy code
docker-compose up --build
Production Mode:
Optimized for production.
Add a docker-compose.prod.yml file for any production-specific overrides (e.g., different environment variables or ports).
Command:
bash
Copy code
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
🛠️ Troubleshooting
Docker Build Issues: Ensure the .dockerignore file excludes unnecessary files (e.g., node_modules or dist).
Database Connection: Check if the backend's DB_HOST matches the database service in docker-compose.yml.
Environment Variables: Double-check .env.backend and .env.database for proper values.
📝 Notes
The backend code is located in the backend/ folder.
PostgreSQL data is persisted using Docker volumes (postgres-data).
