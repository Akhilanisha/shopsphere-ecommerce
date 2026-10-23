# ShopSphere — E-commerce Application

ShopSphere is a full-stack e-commerce application built using Angular, Spring Boot, MySQL, and Docker Compose. The project demonstrates frontend development, REST API integration, database management, containerization, and deployment automation.

## Architecture

```text
                    User / Browser
                          |
                          v
                 Angular Frontend
                    Port 4200
                          |
                          v
                Spring Boot Backend
                    Port 8080
                          |
                          v
                    MySQL Database
                    Port 3306

             Docker Compose manages
               all three services
```

### Technology Stack

| Component | Technology |
|---|---|
| Frontend | Angular 18 |
| Backend | Java 17, Spring Boot 3.3.4 |
| API | Spring Data REST |
| Database | MySQL 8.4 |
| Containerization | Docker |
| Multi-container management | Docker Compose |
| Version control | Git and GitHub |
| CI/CD | Jenkins (planned/under development) |
| Orchestration | Kubernetes / AWS EKS (planned) |

## Prerequisites

Install the following tools:

- Git
- Docker Desktop
- A GitHub account
- A web browser

Docker Desktop must be running before you start the application. You do not need to install Java, Maven, Node.js, or MySQL separately to run the application using Docker Compose.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Akhilanisha/shopsphere-ecommerce.git
cd shopsphere-ecommerce
```

### 2. Configure environment variables

Create a `.env` file in the project root, alongside `docker-compose.yml`.

Add the following variables with your own strong passwords:

```dotenv
MYSQL_ROOT_PASSWORD=replace_with_a_strong_root_password
MYSQL_PASSWORD=replace_with_a_strong_app_password
```

Do not commit or share the `.env` file. It is excluded through `.gitignore`.

### 3. Start the application

```bash
docker compose up --build -d
```

This command builds the frontend and backend images and starts the application containers in the background.

### 4. Check container status

```bash
docker compose ps
```

View application logs:

```bash
docker compose logs -f
```

To view a specific service's logs:

```bash
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f mysql
```

Press `Ctrl+C` to stop following logs; this does not stop the containers.

## Application URLs

| Service | URL |
|---|---|
| ShopSphere storefront | http://localhost:4200 |
| Products REST API | http://localhost:8080/api/products |
| MySQL database | `localhost:3306` |

The MySQL service is accessed using a database client rather than a browser page.

## Useful Docker Commands

Stop the running services:

```bash
docker compose down
```

Restart the services:

```bash
docker compose up -d
```

Rebuild the application after code changes:

```bash
docker compose up --build -d
```

**Warning:** `docker compose down -v` deletes the Compose database volume and its stored data. Use it only when you intentionally want to reset the database.

## Database Notes

The database initialization script is located at `database/init.sql`.

Docker executes initialization scripts when creating a fresh MySQL data directory. If the database volume already exists, editing `init.sql` does not automatically rerun the script.

## Project Structure

```text
shopsphere-ecommerce/
├── frontend/             # Angular application
├── backend/              # Spring Boot REST API
├── database/
│   └── init.sql          # Database initialization
├── deployment/           # Deployment-related files
├── docker-compose.yml    # Multi-container configuration
├── .gitignore
└── README.md
```

## Future Enhancements

- Jenkins CI/CD pipeline
- Automated application testing
- Container image security scanning
- Kubernetes deployment
- AWS EKS deployment
- Production-ready configuration and monitoring

## Repository

GitHub: https://github.com/Akhilanisha/shopsphere-ecommerce

