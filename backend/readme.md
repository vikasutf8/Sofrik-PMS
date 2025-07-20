# Microservices Uber Clone



# User API Documentation

## Base URL
http://localhost:3333/api/v1/users

## Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /register`

**Request Body:**
```javascript
{
  "fullname": {
    "firstName": "John",    // Required, min 3 characters
    "lastName": "Doe"      // Optional, min 3 characters if provided
  },
  "email": "john@example.com",  // Required, must be valid email
  "password": "password123"    // Required, min 6 characters
}
```

**Validation Rules:**
```javascript
{
  "fullname.firstName": {
    "required": true,
    "minLength": 3,
    "message": "Name must be at least 3 characters long"
  },
  "fullname.lastName": {
    "required": false,
    "minLength": 3,
    "message": "Name must be at least 3 characters long"
  },
  "email": {
    "required": true,
    "format": "email",
    "unique": true,
    "message": "Invalid email"
  },
  "password": {
    "required": true,
    "minLength": 6,
    "message": "Password must be at least 6 characters long"
  }
}
```

**Success Response (201 Created):**
```javascript
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2024-01-20T12:00:00.000Z",
    "updatedAt": "2024-01-20T12:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400 Bad Request):**
```javascript
{
  "errors": [
    {
      "msg": "Name must be at least 3 characters long",
      "param": "fullname.firstName",
      "location": "body"
    }
  ]
}
```

## Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Email uniqueness validation
- Input validation using express-validator
- Socket ID tracking for real-time features

## Data Model

### User Schema
```javascript
{
  fullname: {
    firstname: String,  // Required, min length 3
    lastname: String    // Optional, min length 3
  },
  email: String,        // Required, unique
  password: String,     // Required, hashed
  socketId: String,     // Optional
  timestamps: true      // Adds createdAt and updatedAt
}
```


### Login User
Login a user with email and password.

**Endpoint:** `POST /login`

**Request Body:**
```javascript
{
  "email": "john@example.com",  // Required, must be valid email
  "password": "password123"    // Required, min 6 characters
}
```

**Success Response (200 OK):**
```javascript
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "socketId": null,
    "createdAt": "2024-01-20T12:00:00.000Z",
    "updatedAt": "2024-01-20T12:00:00.000Z"
  }
}
```

