# Project Management Tool - Backend Development Tasks
## Project Overview
Building a RESTful API for a project management tool with user authentication, project creation, and task tracking using Node.js, Express.js, TypeScript, and MongoDB.

### Task Breakdown
1. Project Setup & Configuration

 - Initialize Node.js project with TypeScript
 - Configure Express.js server
 - Set up MongoDB connection with Mongoose
 - Configure environment variables
 - Set up folder structure following best practices

2. Database Models & Schema Design

 - User model (email, password, timestamps)
 - Project model (title, description, status, user reference)
 - Task model (title, description, status, due date, project reference)
 - Define relationships between models

3. Authentication System

 - JWT token generation and verification
 - Password hashing with bcrypt
 - Register endpoint with validation
 - Login endpoint with authentication
 - Auth middleware for protected routes

4. Project Management Features

 - Create project endpoint
 - Get user projects endpoint
 - Update project endpoint
 - Delete project endpoint
 - Get single project details

5. Task Management Features

 - Create task endpoint
 - Get tasks by project endpoint
 - Update task endpoint
 - Delete task endpoint
 - Filter tasks by status

6. Validation & Error Handling

 - Input validation using Joi
 - Global error handling middleware
 - Custom error classes
 - Proper HTTP status codes 

7. Database Seeding

 - Create seed script for dummy data
 - One test user with sample projects and tasks
 - npm script for running seeder

8. Documentation

 - README.md with setup instructions
 - API documentation with cURL examples
 - Environment configuration guide
 - Postman collection for API testing
