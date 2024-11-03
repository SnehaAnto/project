## Timesheet App- Phase 2: API Development
    This project, built with NestJS, aims to create a scalable and secure system for managing user timesheets and authentication integrating MongoDB as the database. In this phase, the focus was on designing and implementing RESTful APIs for two core modules: Timesheet and Login. The application uses environment variables for configuration, with support for CRUD operations and authentication services.

## Prerequisites
- Node.js (v22.11.0 or LTS version as per the setup)
- MongoDB (ensure a MongoDB instance is running or available)
- NestJS CLI (optional but helpful for development)
- .env file with a MongoDB URI (MONGODB_URI)

## Getting Started
1. Clone the Repository: git clone https://github.com/SnehaAnto/project
2. Navigate to the assignment2 folder that contains the APIs for this application.
3. Install Dependencies using the command: npm install
4. Environment Setup
    Create a .env file in the root directory and add your MongoDB connection string:
    MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database>
5. Run the Application : npm run start
The application should be running at http://localhost:3001

## Modules
1. Timesheet Module
This module allows users to create, view, update, and delete timesheets. It is structured with a Timesheet schema and provides the following endpoints:

- POST /timesheet - Create a new timesheet entry.
- GET /timesheet - Retrieve all timesheet entries.
- DELETE /timesheet/ - Delete a timesheet entry by ID.
- PUT /timesheet/ - Update a timesheet entry by ID.

2. Login Module
This module manages user authentication with a focus on login functionality. It provides two main endpoints:

- POST /login - Authenticate a user using their identifier (username/email) and password.
- GET /login - Retrieve all registered users (for testing and admin purposes).

## Project Structure

server/src/
├── timesheet/
│   ├── timesheet.controller.ts # Timesheet API controller
│   ├── timesheet.service.ts    # Timesheet business logic
│   └── timesheet.schema.ts     # Mongoose schema for timesheet entries
├── login/
│   ├── login.controller.ts     # Login API controller
│   ├── login.service.ts        # Login business logic
│   └── user.schema.ts          # Mongoose schema for user authentication
└── main.ts                 # Application entry point

## Technologies Used
- NestJS: Backend framework for building scalable server-side applications.
- MongoDB: NoSQL database for storing user and timesheet data.
- Mongoose: ORM for MongoDB, providing schema and validation support.
- ConfigModule: Allows use of environment variables for secure configuration.

## API Testing
Tools like Postman or Insomnia are recommended for testing the API endpoints. Detailed documentation for each endpoint, including request and response formats, can be found in the src directory files.

## Future Phases
Phase 3 and Phase 4 will build upon these APIs by adding more complex functionality, such as enhanced authentication and user role management.