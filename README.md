# Job Application Management System

A full-stack web application for managing job applications, tracking application status, and maintaining job-related information.

## Project Overview

Job Application Management System is a web-based application that allows users to register, login, browse available jobs, apply for jobs, track their applications, and manage their profile.

The project is developed using React.js for the frontend and Java Spring Boot with Spring JDBC for the backend. MySQL is used as the database.

## Features

- User Registration
- User Login
- Protected Routes
- Dashboard
- View Available Jobs
- Add New Jobs
- Apply for Jobs
- View My Applications
- Withdraw Applications
- Application Status Tracking
- User Profile
- 404 Page
- REST APIs
- MySQL Database

## Technologies Used

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Axios
- React Router
- Vite

### Backend

- Java
- Spring Boot
- Spring JDBC
- JdbcTemplate
- REST API
- Maven

### Database

- MySQL

## Project Structure

job-application-management-system/

├── frontend/

│   ├── src/

│   ├── public/

│   ├── package.json

│   └── vite.config.js

│

├── backend/

│   ├── src/

│   ├── pom.xml

│   └── ...

│

├── database/

│   └── job_application.sql

│

├── .gitignore

└── README.md

## Application Flow

User
   ↓
React.js Frontend
   ↓
Axios
   ↓
Spring Boot REST API
   ↓
Spring JDBC / JdbcTemplate
   ↓
MySQL Database

## Backend API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Jobs

GET /api/jobs

GET /api/jobs/{id}

POST /api/jobs

PUT /api/jobs/{id}

DELETE /api/jobs/{id}

### Applications

POST /api/applications

GET /api/applications/user/{userId}

PUT /api/applications/{id}/status

DELETE /api/applications/{id}

GET /api/applications/dashboard/{userId}

### Users

GET /api/users/{id}

## Database

The project uses MySQL database named:

job_application_db

The complete database SQL script is available inside:

database/job_application.sql

## How to Run the Project

### Backend Setup

1. Open the backend folder in IntelliJ IDEA.

2. Make sure MySQL is running.

3. Create the database using:

database/job_application.sql

4. Open:

backend/src/main/resources/application.properties

5. Configure your MySQL username and password.

6. Run the Spring Boot application.

Backend will run on:

http://localhost:8080

### Frontend Setup

Open terminal inside the frontend folder.

Install dependencies:

npm install

Start the React application:

npm run dev

Frontend will run on:

http://localhost:5173

## Author

Job Application Management System

## License

This project is created for educational and project demonstration purposes.