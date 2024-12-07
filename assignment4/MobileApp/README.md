# Phase 4: Final Project - Timesheet Mobile Application

A mobile application built with Ionic React for managing employee timesheets. This application provides a user-friendly interface for tracking work hours, managing projects, and viewing timesheet history.

## Tech Stack

- Ionic Framework v7
- React v18
- TypeScript
- Vite
- Capacitor

## Prerequisites

- Node.js (LTS version)
- npm or yarn
- Ionic CLI (`npm install -g @ionic/cli`)

## Installation

1. Clone the repository
2. Navigate to the MobileApp/timesheet directory
3. Install dependencies: 


## Development Server

Run the development server: npm run ionic:serve

The application will be available at `http://localhost:8100`


## Project Structure

### Core Files
- `index.html` - Entry point HTML file
- `src/index.tsx` - Main React entry point
- `src/App.tsx` - Root application component
- `vite.config.ts` - Vite configuration

### Pages
- `Login` - User authentication page with email/username login options
- `Register` - New user registration page
- `NewEntry` - Form for creating new timesheet entries
- `History` - List of timesheet entries with delete functionality
- `Profile` - User profile management and logout
- `Tabs` - Navigation component for the main application

### Context
- `AuthContext` - Authentication state management

### Styling
- Individual CSS files for each component
- Global theme variables in `theme/variables.css`
- Responsive design with mobile-first approach

## Features

### Authentication
- Dual login method (email or username)
- JWT-based authentication
- Secure token storage
- Role-based access (HR/Employee)

### Timesheet Management
- Create new timesheet entries
- View entry history
- Delete entries
- Project selection
- Hours tracking
- Description support

### User Profile
- View user information
- Role display
- Secure logout
- Avatar display

## API Integration

The application connects to a NestJS backend running on `http://localhost:3001` with the following main endpoints:

- `/auth/login` - User authentication
- `/auth/register` - New user registration
- `/timesheet` - Timesheet entry management
- `/timesheet/:id/tasks` - Project/task management

## Styling Features

- Custom background images for login/register pages
- Glassmorphism effect using backdrop filters
- Responsive design for various screen sizes
- Custom Ionic theme variables
- Consistent component styling

## Security Features

- JWT token management
- Protected routes
- Secure credential handling
- Role-based access control
- Session management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.