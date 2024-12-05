# API Documentation

This document provides detailed information about the Timesheet Application API endpoints, including request/response examples.

## Base URL
```
http://localhost:3001
```

## Authentication
Most endpoints require a JWT token. Include it in the request header as:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Auth Module

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "email": "employee@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EMPLOYEE"  // EMPLOYEE or HR
}
```

**Response (201):**
```json
{
  "id": "65f4a3b2c1d0e2f3a4b5c6d7",
  "email": "employee@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EMPLOYEE"
}
```

#### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "employee@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f4a3b2c1d0e2f3a4b5c6d7",
    "email": "employee@example.com",
    "role": "EMPLOYEE"
  }
}
```

#### Get Profile
```http
GET /auth/profile
```

**Response (200):**
```json
{
  "id": "65f4a3b2c1d0e2f3a4b5c6d7",
  "email": "employee@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EMPLOYEE"
}
```

#### Change Password
```http
PUT /auth/change-password
```

**Request Body:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

**Response (200):**
```json
{
  "message": "Password updated successfully"
}
```

### Timesheet Module

#### Create Timesheet Entry
```http
POST /timesheet
```
**Auth:** Required (EMPLOYEE, HR)

**Request Body:**
```json
{
  "date": "2024-03-15",
  "hours": 8,
  "description": "Worked on project documentation",
  "project": "Project A"
}
```

**Response (201):**
```json
{
  "id": "65f4a3b2c1d0e2f3a4b5c6d7",
  "date": "2024-03-15",
  "hours": 8,
  "description": "Worked on project documentation",
  "project": "Project A",
  "userId": "65f4a3b2c1d0e2f3a4b5c6d7",
  "createdAt": "2024-03-15T10:00:00.000Z",
  "updatedAt": "2024-03-15T10:00:00.000Z"
}
```

#### Get Timesheet Entries (with pagination)
```http
GET /timesheet?page=1&limit=10
```
**Auth:** Required (EMPLOYEE, HR)

**Query Parameters:**
- page (optional, default: 1)
- limit (optional, default: 10)

**Response (200):**
```json
{
  "data": [
    {
      "id": "65f4a3b2c1d0e2f3a4b5c6d7",
      "date": "2024-03-15",
      "hours": 8,
      "description": "Worked on project documentation",
      "project": "Project A",
      "userId": "65f4a3b2c1d0e2f3a4b5c6d7",
      "createdAt": "2024-03-15T10:00:00.000Z",
      "updatedAt": "2024-03-15T10:00:00.000Z"
    }
    // ... more entries
  ],
  "total": 25,
  "page": 1,
  "lastPage": 3
}
```

#### Update Timesheet Entry
```http
PUT /timesheet/:id
```
**Auth:** Required (EMPLOYEE, HR)

**Request Body:**
```json
{
  "hours": 9,
  "description": "Updated project documentation"
}
```

**Response (200):**
```json
{
  "id": "65f4a3b2c1d0e2f3a4b5c6d7",
  "date": "2024-03-15",
  "hours": 9,
  "description": "Updated project documentation",
  "project": "Project A",
  "userId": "65f4a3b2c1d0e2f3a4b5c6d7",
  "updatedAt": "2024-03-15T11:00:00.000Z"
}
```

#### Soft Delete Timesheet Entry
```http
DELETE /timesheet/:id
```
**Auth:** Required (HR only)

**Response (200):**
```json
{
  "message": "Timesheet entry soft deleted successfully"
}
```

#### Get Soft-Deleted Entries
```http
GET /timesheet/deleted
```
**Auth:** Required (HR only)

**Response (200):**
```json
{
  "data": [
    {
      "id": "65f4a3b2c1d0e2f3a4b5c6d7",
      "date": "2024-03-15",
      "hours": 8,
      "description": "Worked on project documentation",
      "project": "Project A",
      "userId": "65f4a3b2c1d0e2f3a4b5c6d7",
      "deletedAt": "2024-03-16T10:00:00.000Z"
    }
    // ... more entries
  ]
}
```

### User Module

#### List All Users
```http
GET /users
```
**Auth:** Required (HR only)

**Response (200):**
```json
{
  "data": [
    {
      "id": "65f4a3b2c1d0e2f3a4b5c6d7",
      "email": "employee@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "EMPLOYEE"
    }
    // ... more users
  ]
}
```

#### Get User Details
```http
GET /users/:id
```
**Auth:** Required (HR only)

**Response (200):**
```json
{
  "id": "65f4a3b2c1d0e2f3a4b5c6d7",
  "email": "employee@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "EMPLOYEE"
}
```

#### Update User Role
```http
PUT /users/:id/role
```
**Auth:** Required (HR only)

**Request Body:**
```json
{
  "role": "HR"
}
```

**Response (200):**
```json
{
  "id": "65f4a3b2c1d0e2f3a4b5c6d7",
  "email": "employee@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "HR"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
``` 