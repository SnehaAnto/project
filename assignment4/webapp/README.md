# Timesheet Web Application

A modern web application for timesheet management built with Next.js 14, TypeScript, and Tailwind CSS.

## Core Features

### Authentication
- Dual login method (email or username)
- JWT-based authentication
- Secure token storage
- Role-based access control (HR/Employee)

### HR Dashboard
- User management
- New user registration
- Task assignment
- Role management
- User activity monitoring

### Timesheet Management
- Create and manage timesheet entries
- View entry history
- Delete entries
- Project selection
- Hours tracking
- Description support

### User Interface
- Responsive design
- Modern glassmorphism effects
- Clean and intuitive navigation
- Role-based navigation elements
- Toast notifications for user feedback

## Application URLs

### Public Routes
- `/` - Home (redirects to login)
- `/login` - User authentication page
- `/register` - New user registration page

### Protected Routes
- `/timesheet` - Timesheet management (all authenticated users)
- `/hr` - HR Dashboard (HR users only)

## Technical Architecture

### Frontend
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Client-side form validation
- Responsive image handling

### Security Features
- JWT token management
- Protected routes with Guards
- Role-based access control
- Secure credential handling
- Session management

### API Integration
The application connects to a NestJS backend running on `http://localhost:3001` with endpoints:
- `/auth/login` - User authentication
- `/auth/register` - New user registration
- `/timesheet` - Timesheet management
- `/users` - User management (HR only)
- `/tasks` - Task management

## Getting Started

1. Clone the repository
2. Install dependencies: npm install
3. Run the development server:npm run dev

## Development Guidelines

### Code Structure
- `app/` - Next.js 14 app directory
- `ui/` - Reusable UI components
- `guards/` - Route protection components
- `public/` - Static assets

### Styling
- Tailwind CSS for utility-first styling
- Custom background images
- Glassmorphism effects using backdrop filters
- Responsive design patterns

### Security
- Client-side role validation
- Server-side authentication checks
- Protected API routes
- Secure data handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

