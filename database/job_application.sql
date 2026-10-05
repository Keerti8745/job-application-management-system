CREATE DATABASE IF NOT EXISTS job_application_db;

USE job_application_db;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER'
);

CREATE TABLE IF NOT EXISTS jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(150) NOT NULL,
    job_title VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    job_type VARCHAR(50),
    salary DECIMAL(10,2),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    job_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'APPLIED',
    applied_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE CASCADE
);

INSERT INTO jobs
(company_name, job_title, location, job_type, salary, description)
VALUES
(
    'TCS',
    'Java Developer',
    'Jaipur',
    'Full Time',
    600000,
    'Java and Spring Boot developer required'
),
(
    'Infosys',
    'Software Engineer',
    'Pune',
    'Full Time',
    700000,
    'Software development role'
),
(
    'Accenture',
    'Backend Developer',
    'Bangalore',
    'Full Time',
    800000,
    'Backend development using Java'
);