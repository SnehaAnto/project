## Timesheet App- Phase 3: Authentication, Authorization, and Enhanced Features

## Prerequisites
- Node.js (v22.11.0 or LTS version as per the setup)
- MongoDB/ MongoDB Atlas (ensure a MongoDB instance is running or available)
- NestJS CLI (optional but helpful for development)
- .env file with required environment variables:
  ```
  MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database>
  JWT_SECRET=your_jwt_secret_key
  JWT_EXPIRATION=1h
  ```

## Getting Started
1. Clone the Repository: git clone https://github.com/SnehaAnto/project
2. Navigate to the assignment3 folder
3. Install Dependencies: npm install
4. Set up environment variables (see above)
5. Run the Application: npm run start
The application runs at http://localhost:3001

## Security Features

### Authentication
- JWT-based authentication system
- Password hashing using bcrypt
- Token-based session management
- Protected routes using AuthGuard

### Authorization
- Role-based access control (RBAC)
- User roles: HR, EMPLOYEE
- RoleGuard for role-specific endpoint protection
- Role-based endpoint permissions

## Modules

### 1. Timesheet Module
Enhanced with pagination and soft delete functionality:

- POST /timesheet - Create a new timesheet entry (Protected: EMPLOYEE, HR)
- GET /timesheet - Retrieve timesheet entries with pagination (Protected: EMPLOYEE, HR)
  - Query params: page (default: 1), limit (default: 10)
  - Returns: { data: [], total: number, page: number, lastPage: number }
- DELETE /timesheet/:id - Soft delete a timesheet entry (Protected: HR)
- PUT /timesheet/:id - Update a timesheet entry (Protected: EMPLOYEE, HR)
- GET /timesheet/deleted - View soft-deleted entries (Protected: HR)

### 2. Auth Module
Handles user authentication and authorization:

- POST /auth/register - Register new user
- POST /auth/login - Authenticate user and receive JWT
- GET /auth/profile - Get current user profile (Protected)
- PUT /auth/change-password - Update password (Protected)

### 3. User Module
Manages user operations:

- GET /users - List all users
- GET /users/:id - Get user details 
- PUT /users/:id/role - Update user role (Protected: HR)

## Project Structure

server/src/

##Auth Module
├── auth/

│   ├── guards/

│   │   └── roles.guard.ts

│   ├── decorators/

│   │   └── roles.decorator.ts

│   ├── auth.controller.ts

│   ├── auth.service.ts

│   └── auth.module.ts


##Timesheet Module

├── timesheet/

│   ├── timesheet.controller.ts

│   ├── timesheet.service.ts

│   └── timesheet.schema.ts


└── main.ts

## Technologies Used
- NestJS: Backend framework
- MongoDB Atlas: Database
- Mongoose: MongoDB ORM
- JWT: Authentication tokens
- bcrypt: Password hashing
- class-validator: DTO validation
- class-transformer: Object transformation

## Security Best Practices
- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- Role-based access control
- Protected routes using Guards
- Soft delete instead of hard delete
- Input validation using DTOs
- Environment variables for sensitive data

## API Documentation
Complete API documentation with request/response examples is available in the /docs folder.

## Error Handling
The application implements a global exception filter that handles:
- Validation errors
- Authentication errors
- Authorization errors
- Database errors
- Not found errors
