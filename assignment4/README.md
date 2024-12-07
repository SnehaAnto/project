# Phase 4: Final Project - Web and Mobile Timesheet Application

A comprehensive timesheet management system consisting of a NestJS backend server, Next.js web application, and Ionic React mobile application.

## Project Overview

This project implements a complete timesheet management solution with:
- Role-based access control (HR/Employee)
- Web and mobile interfaces
- Secure authentication
- Real-time data synchronization
- Responsive design

## Project Structure

### Root Directory
assignment4/

├── server/ # NestJS backend server

├── webapp/ # Next.js web application

└── MobileApp/ # Ionic React mobile application


### Server Directory (`/server`)
server/

├── src/

│ ├── auth/ # Authentication logic and guards

│ │ ├── guards/ # Route protection middleware

│ ├── timesheet/ # Timesheet CRUD operations

│ ├── dto/ # Data transfer objects

├── test/ # Test files

└── config/ # Configuration files


### Web Application Directory (`/webapp`)
webapp/

├── src/

│ ├── app/

│ │ ├── ui/ # Reusable UI components

│ │ │ ├── guards/ # Route protection

│ │ │ ├── hr/ # HR dashboard

│ │ │ ├── timesheet/ # Timesheet management

├── public/ # Static assets


### Mobile Application Directory (`/MobileApp/timesheet`)
MobileApp/timesheet/

├── src/

│ ├── pages/ # Application pages/routes

│ ├── context/ # State management

│ ├── theme/ # Styling and theming

├── public/ # Static assets


## System Architecture

### 1. Backend Server (NestJS)
- `src/auth` - Authentication and authorization
- `src/timesheet` - Timesheet management
- `src/users` - User management
- `src/tasks` - Task management
- `src/guards` - Route protection
- `src/dto` - Data transfer objects
- `src/schemas` - MongoDB schemas

### 2. Web Application (Next.js)
-src/app` - Next.js app directory
- `src/app/ui` - Reusable UI components
- `src/app/guards` - Route protection
- `src/app/hr` - HR dashboard
- `src/app/timesheet` - Timesheet management
- `public` - Static assets

### 3. Mobile Application (Ionic React)
- `src/pages` - Application pages
- `src/components` - Reusable components
- `src/contexts` - State management
- `src/theme` - Styling and theming
- `src/services` - API integration
- `public` - Static assets

## Features

### Authentication & Authorization
- Dual login method (email/username)
- JWT-based authentication
- Role-based access control
- Protected routes
- Secure token management

### HR Dashboard (Web Only)
- User Management
  - View all users
  - Register new users
  - Assign roles
  - Manage user tasks
- Task Management
  - Create tasks
  - Assign tasks to users
  - Track task status
- Activity Monitoring
  - View timesheet entries
  - Track user activities

### Timesheet Management
- Create new entries
- View history with pagination
- Delete entries
- Project/task selection
- Hours tracking
- Description support

### User Management
- User registration
- Role assignment
- Profile management
- Task assignment

## Technical Stack

### Backend
- NestJS framework
- MongoDB/MongoDB Atlas
- JWT authentication
- bcrypt password hashing
- Class validator/transformer

### Web Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- JWT handling
- Protected routes

### Mobile Frontend
- Ionic Framework v7
- React v18
- Capacitor
- Native device features
- Offline storage capability

## Getting Started

### Prerequisites
- Node.js (v22.11.0 or LTS)
- MongoDB instance
- Ionic CLI (for mobile development)
- Git

### Installation

1. Clone the repository
2. Set up environment variables:
    MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database>
    JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h


3. Install and start the backend:
    npm install
    npm run start

4. Install and start the web application:
    cd webapp
    npm install
    pnpm run dev
    
5. Install and start the mobile application:
    cd MobileApp/timesheet
    npm install
    npm run ionic:serve


## API Endpoints

### Authentication
- POST /auth/register - New user registration
- POST /auth/login - User authentication
- GET /auth/profile - Get user profile

### Timesheet Management
- POST /timesheet - Create entry
- GET /timesheet - List entries (paginated)
- DELETE /timesheet/:id - Delete entry
- GET /timesheet/:id/tasks - Get user tasks

### User Management
- GET /users - List all users
- PUT /users/:id/role - Update user role
- GET /users/:id - Get user details

## Security Measures

1. Authentication:
- JWT token validation
- Password hashing
- Secure token storage
- Protected routes

2. Authorization:
- Role-based access control
- Route guards
- API endpoint protection

3. Data Security:
- Input validation
- Secure password handling
- XSS protection
- CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.