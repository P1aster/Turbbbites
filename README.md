# Turbbbites: NestJS Backend + PostgreSQL (Dockerized) 
This repository contains a monorepo for a NestJS backend and a PostgreSQL database. The project is partially dockerized.

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
version: "1.0"

services:
  database:
    image: postgres:latest
    container_name: turbbbites-db-container
    env_file:
      - .env
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - '5433:5432'
    volumes:
      - db_data:/var/lib/postgresql/data
volumes:
  db_data:

```




