# Microservices Uber Clone

# Middlware Documentation

## Authentication Middleware
This middleware checks if the user is authenticated and if not, it returns a 401 Unauthorized response.

- cookies
  - req.cookies.token  [app.use(cookieParser())]
  - on login, set the token in the cookie
  ```res.cookie("token", token, {maxAge: 60*60*24*30, httpOnly: true});```
- headers
  - req.headers.authorization.split('')[1] 
    - split('')[1] to remove the "Bearer " prefix from the token for exmaple
     ```Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTE1ZDI0MDc5MDQ0MjI3ZTc1MDA0IiwiaWF0IjoxNjE4NjQ5Njk5fQ.3-9-4-3-9-4-3-9-4-3-9-4-3-9-4-3-9-4-3-9-4-3-9-4-3-9-4-3-9-4-3-9-4-3```

# Uber Clone API Documentation

## Base URLs
- Users API: `/api/v1/users`
- Riders API: `/api/v1/riders`

## Authentication
All authenticated endpoints require a JWT token. Token can be provided in two ways:
1. Authorization header: `Authorization: Bearer <token>`
2. HTTP-only cookie (automatically handled by the browser)

## Common Features
- JWT-based authentication
- Token blacklisting for logout
- Password hashing with bcrypt
- Input validation with express-validator
- Real-time support with Socket.IO

## User API Endpoints

### 1. Register User
**Endpoint:** `POST /users/register`

**Request Body:**
```javascript
{
  "fullname": {
    "firstName": "string",  // Required, min 3 chars
    "lastName": "string"   // Optional, min 3 chars
  },
  "email": "string",      // Required, valid email
  "password": "string"    // Required, min 6 chars
}
```

### 2. Login User
**Endpoint:** `POST /users/login`

**Request Body:**
```javascript
{
  "email": "string",    // Required, valid email
  "password": "string"  // Required, min 6 chars
}
```

### 3. Get User Profile
**Endpoint:** `GET /users/profile`
**Auth Required:** Yes

### 4. Logout User
**Endpoint:** `GET /users/logout`
**Auth Required:** Yes

## Rider API Endpoints

### 1. Register Rider
**Endpoint:** `POST /riders/register`

**Request Body:**
```javascript
{
  "fullname": {
    "firstName": "string",  // Required, min 3 chars
    "lastName": "string"   // Optional, min 3 chars
  },
  "email": "string",      // Required, valid email
  "password": "string",   // Required, min 6 chars
  "vehicle": {
    "color": "string",    // Required, min 3 chars
    "plate": "string",    // Required, min 6 chars
    "capacity": number,    // Required, min 1
    "vehicleType": "string" // Required: "car"|"motorcycle"|"auto"
  }
}
```

**Validation Rules:**
- `fullname.firstName`: Minimum 3 characters
- `email`: Valid email format, unique in database
- `password`: Minimum 6 characters
- `vehicle.color`: Minimum 3 characters
- `vehicle.plate`: Minimum 6 characters
- `vehicle.capacity`: Minimum 1
- `vehicle.vehicleType`: Must be one of: ["car", "motorcycle", "auto"]

**Success Response (201 Created):**
```javascript
{
  "rider": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    },
    "status": "Inactive",  // or "Active"
    "location": {
      "lat": number,
      "lng": number
    },
    "socketId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "token": "JWT_TOKEN"
}
```

### 2. Login Rider
**Endpoint:** `POST /riders/login`

**Request Body:**
```javascript
{
  "email": "string",    // Required, valid email
  "password": "string"  // Required, min 6 chars
}
```

### 3. Get Rider Profile
**Endpoint:** `GET /riders/profile`
**Auth Required:** Yes

### 4. Logout Rider
**Endpoint:** `GET /riders/logout`
**Auth Required:** Yes

## Error Responses

### Validation Error (400 Bad Request):
```javascript
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

### Authentication Error (401 Unauthorized):
```javascript
{
  "message": "Unauthorized"
}
```

## Data Models

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

### Rider Schema
```javascript
{
  fullname: {
    firstname: String,  // Required, min length 3
    lastname: String    // Optional, min length 3
  },
  email: String,        // Required, unique
  password: String,     // Required, hashed
  socketId: String,     // Optional
  status: String,       // Enum: ["Active", "Inactive"]
  vehicle: {
    color: String,      // Required, min length 3
    plate: String,      // Required, min length 6
    capacity: Number,   // Required, min 1
    vehicleType: String // Enum: ["car", "motorcycle", "auto"]
  },
  location: {
    lat: Number,       // Optional
    lng: Number        // Optional
  },
  timestamps: true      // Adds createdAt and updatedAt
}
```

### Blacklist Schema
```javascript
{
  token: String,        // Required, unique
  createdAt: Date       // Auto-expires after 24 hours
}
```

## Authentication Middleware

### User Authentication
- Validates JWT token from Authorization header or cookie
- Checks token against blacklist
- Verifies token signature
- Attaches user object to request

### Rider Authentication
- Similar to user authentication
- Specifically validates rider tokens
- Attaches rider object to request

## Security Features
- Password hashing with bcrypt
- JWT token expiration (1 day)
- Token blacklisting
- HTTP-only cookies
- Input validation
- Email uniqueness validation

## Maps API Endpoints

### 1. Get Coordinates
**Endpoint:** `GET /maps/getCoordinates`

**Query Parameters:**
- `address`: String (min 3 characters)

**Auth Required:** Yes

**Success Response (200 OK):**
```javascript
{
  "lat": number,
  "lng": number
}
```

### 2. Get Distance and Time
**Endpoint:** `GET /maps/getDistanceTime`

**Query Parameters:**
- `origin`: String (min 3 characters)
- `destination`: String (min 3 characters)

**Auth Required:** Yes

**Success Response (200 OK):**
```javascript
{
  "distanceTime": {
    "distance": number,    // Distance in meters
    "duration": number    // Duration in seconds
  }
}
i.e: 
{
    "distanceTime": {
        "distance": 950886,
        "duration": 52248
    }
}
```

**Error Responses:**

1. Validation Error (400 Bad Request):
```javascript
{
  "errors": [
    {
      "msg": "Origin must be a string and at least 3 characters long",
      "param": "origin",
      "location": "query"
    }
  ]
}
```

2. Maps API Error (500 Internal Server Error):
```javascript
{
  "error": "Error fetching distance and duration from Google Maps API"
}
```

## Maps Service Features

### Geocoding
- Converts addresses to coordinates using GoMaps.pro API
- Validates address input
- Returns precise latitude and longitude

### Distance Matrix
- Calculates distance and travel time between two points
- Supports address-based queries
- Returns distance in meters and duration in seconds

### Error Handling
- Input validation for addresses
- API response validation
- Detailed error messages for troubleshooting

### Security
- Protected routes with authentication
- API key management through environment variables
- Query parameter validation



###IMPORTANT :USING maps.gomaps.pro API ::FREE FREE


# Ride API Endpoints

### 1. Create Ride
**Endpoint:** `POST /api/v1/rides/create`

**Request Body:**
```javascript
{
  "pickup": "string",  // Required, min 3 characters
  "dropoff": "string",  // Required, min 3 characters
  "vehicleType": "string"  // Required, min 3 characters
}
```

**Success Response (201 Created):**
```javascript
{
  "ride": {
    "user": "string",
    "pickup": "string",
    "dropoff": "string",
    "fare": number,
    "status": "string",
    "duration": number,
    "distance": number,
    "paymentId": "string",
    "orderId": "string",
    "signature": "string"
  }
}

{
    "ride": {
        "user": "688276aa2487de3bf11be099",
        "pickup": "IIITDM jabalpur campus",
        "dropoff": "sardar market,Jabalpur",
        "fare": 87.2,
        "status": "pending",
        "_id": "68828c5fc23d23d998158ecf",
        "__v": 0
    }
}
```