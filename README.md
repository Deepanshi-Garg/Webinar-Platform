# Webinar-Platform

This API allows authenticated users to manage webinars, including creating, listing, and fetching webinar details.

## Base URL
```
http://localhost:4000
```

## Authentication
All routes require authentication using a token. The `authMiddleware` ensures that only authenticated users can access the endpoints.

---

## Endpoints

### 1. User Signup
**Endpoint:**
```
POST /user/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

**Errors:**
- `400 Bad Request`: If required fields are missing.
- `400 Bad Request`: If the user already exists.
- `500 Internal Server Error`: If there's an issue with registration.

---

### 2. User Login
**Endpoint:**
```
POST /user/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User logged in successfully!",
  "accessToken": "your-jwt-token",
  "user": {
    "id": "65f9c3d4a2b1e89f12345678",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "host"
  }
}
```

**Errors:**
- `400 Bad Request`: If required fields are missing.
- `400 Bad Request`: If credentials are invalid.
- `500 Internal Server Error`: If there's an issue with login.

---

### 3. Create a Webinar
**Endpoint:**
```
POST /webinars/
```

**Headers:**
```
Authorization: <your_token>
```

**Request Body:**
```json
{
  "title": "Introduction to Node.js",
  "description": "Learn the fundamentals of Node.js and how to build scalable web applications.",
  "date": "2025-04-10T14:00:00.000Z",
  "duration": 90
}
```

**Response:**
```json
{
  "message": "Webinar created successfully",
  "webinar": {
    "_id": "65f9c3d4a2b1e89f12345678",
    "title": "Introduction to Node.js",
    "description": "Learn the fundamentals of Node.js and how to build scalable web applications.",
    "date": "2025-04-10T14:00:00.000Z",
    "duration": 90,
    "host": "65f9c3d4a2b1e89f12345679"
  }
}
```

**Errors:**
- `401 Unauthorized`: If the user is not authenticated or not a host.
- `400 Bad Request`: If required fields are missing.
- `500 Internal Server Error`: If there's an issue creating the webinar.

---

### 4. List All Webinars
**Endpoint:**
```
GET /webinar/
```

**Headers:**
```
Authorization: <your_token>
```

**Response:**
```json
[
  {
    "_id": "65f9c3d4a2b1e89f12345678",
    "title": "Introduction to Node.js",
    "description": "Learn the fundamentals of Node.js and how to build scalable web applications.",
    "date": "2025-04-10T14:00:00.000Z",
    "duration": 90,
    "host": {
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

**Errors:**
- `404 Not Found`: If no webinars are found.
- `500 Internal Server Error`: If there's an issue fetching the webinars.

---

### 5. Get Webinar Details
**Endpoint:**
```
GET /webinar/:id
```

**Headers:**
```
Authorization: <your_token>
```

**Response:**
```json
{
  "_id": "65f9c3d4a2b1e89f12345678",
  "title": "Introduction to Node.js",
  "description": "Learn the fundamentals of Node.js and how to build scalable web applications.",
  "date": "2025-04-10T14:00:00.000Z",
  "duration": 90,
  "host": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- `404 Not Found`: If the webinar does not exist.
- `500 Internal Server Error`: If there's an issue fetching the webinar details.

---

## Error Handling
- All errors return a JSON response with a `message` field.
- Proper HTTP status codes are used: `400`, `401`, `404`, and `500`.

## Notes
- Ensure that the **Authorization** token should be send in the headers for all requests.
- Only **hosts** can create webinars.
- Webinars are stored with a reference to the `host`, which is a user.

---

## Author
**Deepanshi Garg**
