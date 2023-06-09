# TechPrimeLab-assignment

#### Login Email and Passwrd : <gt29015@gmail.com> <12345>

## Project Management API

This is a Node.js-based API for managing user authentication and project management.

### Backend Depolyed link: <https://techprimelab-heaz.onrender.com>

### Forntend Depolyes link: <https://techprimelab-gt.netlify.app>

## Prerequisites

- Node.js
- Express.js
- MongoDB
- bcrypt
- jsonwebtoken

## Installation

1. Clone the repository: git clone <https://github.com/gr7800/TechPrimeLab-assignment>

2. Navigate to the project directory: cd project-management-api

3. Install the dependencies: npm install

4. Set up the environment variables:
- Create a `.env` file in the project root directory.
- Add the following environment variables:
  ```
  JWT_SECRET=<your_jwt_secret_key>
  ```

5. Start the server: npm start


## User Routes

### Signup

Create a new user account.

- URL: `POST /api/users/signup`
- Request body:
- `email`: User's email address
- `password`: User's password
- Response:
- Success: `{ "message": "Signup successful" }`
- Error: `{ "error": "Signup failed" }`

### Login

Authenticate a user and generate a JWT token.

- URL: `POST /api/users/login`
- Request body:
- `email`: User's email address
- `password`: User's password
- Response:
- Success: `{ "token": "<generated_jwt_token>" }`
- Error: `{ "error": "Invalid credentials" }` or `{ "error": "Login failed" }`

### Get all users

Retrieve a list of all users.

- URL: `GET /api/users`
- Response:
- Success: Array of user objects
- Error: `{ "error": "Unable to fetch users" }`

## Project Routes

### Get all projects

Retrieve a paginated list of projects with optional search and sorting.

- URL: `GET /api/projects`
- Query parameters:
- `search`: Search query string (optional)
- `page`: Page number (optional)
- `sort`: Sort order (`field:order`) (optional)
- Response:
- Success:
 ```json
 {
   "projects": [ Array of project objects ],
   "pagination": {
     "count": Total project count,
     "pageCount": Total page count
   }
 }
 ```
- Error: `{ "error": "Unable to fetch projects" }`

### Create a new project

Create a new project.

- URL: `POST /api/projects/create`
- Request body: Project details
- Response:
- Success: `{ "message": "Project created successfully" }`
- Error: `{ "error": "Unable to create project" }`

### Update project status to "Running"

Update the status of a project to "Running".

- URL: `PATCH /api/projects/statusrun/:id`
- Response:
- Success: Updated project object or `{ "error": "Project not found" }`
- Error: `{ "error": "Unable to update project status" }`

### Update project status to "Closed"

Update the status of a project to "Closed".

- URL: `PATCH /api/projects/statusclose/:id`
- Response:
- Success: Updated project object or `{ "error": "Project not found" }`
- Error: `{ "error": "Unable to update project status" }`

### Update project status to "Cancelled"

Update the status of a project to "Cancelled".

- URL: `PATCH /api/projects/statuscancel/:id`
- Response:
- Success: Updated project object or `{ "error": "Project not found" }`
- Error: `{ "error": "Unable to update project status" }`

### Get total number of projects

Retrieve the total count of projects based on different status types.

- URL: `GET /api/projects/projectinfo`
- Response:
- Success:
 ```json
 {
   "total": Total project count,
   "cancel": Cancelled project count,
   "running": Running project count,
   "registered": Registered project count,
   "closed": Closed project count,
   "delayedRunning": Delayed running project count
 }
 ```
- Error: `{ "error": "Unable to fetch total projects" }`

### Get department statistics for a dashboard chart

Retrieve department statistics for generating a chart for the dashboard.

- URL: `GET /api/projects/dashboardchart`
- Response:
- Success: Array of department statistics objects
- Error: `{ "error": "Unable to fetch department stats" }`

## Helper Functions

### updateProjectStatus

Helper function to update the status of a project.

- Parameters:
- `id`: Project ID
- `status`: New status value
- Returns: Updated project object or `{ "error": "Project not found" }`

---

Feel free to customize and extend the API as per your requirements.

