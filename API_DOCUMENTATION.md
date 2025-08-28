# Schedule Ace API Documentation

This document outlines the API endpoints needed for the Schedule Ace application to function properly. All endpoints should return JSON responses and follow RESTful conventions.

## Base URL
```
https://your-api-domain.com/api/v1
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format
All responses should follow this format:
```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "errors": object (optional)
}
```

---

## Authentication Endpoints

### POST /auth/sign-up
Register a new user account.

**Request Body:**
```json
{
  "firstname": "string",
  "lastname": "string", 
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

### POST /auth/login
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_string",
    "user": {
      "id": "string",
      "firstname": "string",
      "lastname": "string",
      "fullname": "string",
      "email": "string"
    }
  }
}
```

---

## Tasks Endpoints

### GET /tasks
Fetch all tasks for the authenticated user.

**Query Parameters:**
- `category` (optional): Filter by category ("academic", "personal", "financial")
- `date` (optional): Filter by specific date (YYYY-MM-DD)
- `completed` (optional): Filter by completion status (boolean)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "category": "academic|personal|financial",
      "date": "YYYY-MM-DD",
      "startTime": "HH:mm",
      "endTime": "HH:mm",
      "timeToNotify": number,
      "notes": "string",
      "isCompleted": boolean,
      "notificationSent": boolean,
      "user": "user_id",
      "createdAt": "ISO_date_string",
      "updatedAt": "ISO_date_string"
    }
  ]
}
```

### POST /tasks
Create a new task.

**Request Body:**
```json
{
  "title": "string",
  "category": "academic|personal|financial",
  "date": "YYYY-MM-DD",
  "startTime": "HH:mm",
  "endTime": "HH:mm",
  "timeToNotify": number,
  "notes": "string"
}
```

### PUT /tasks/:id
Update an existing task.

**Request Body:** Same as POST /tasks

### DELETE /tasks/:id
Delete a task.

### PUT /tasks/:id/toggle-completion
Toggle task completion status.

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated task object
  }
}
```

---

## Notes Endpoints

### GET /notes
Fetch all notes for the authenticated user.

**Query Parameters:**
- `search` (optional): Search notes by title or content

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "note": "string",
      "user": "user_id",
      "createdAt": "ISO_date_string",
      "updatedAt": "ISO_date_string"
    }
  ]
}
```

### POST /notes
Create a new note.

**Request Body:**
```json
{
  "title": "string",
  "note": "string"
}
```

### PUT /notes/:id
Update an existing note.

### DELETE /notes/:id
Delete a note.

### GET /notes/:id
Get a specific note by ID.

---

## Events Endpoints

### GET /events
Fetch all events for the authenticated user.

**Query Parameters:**
- `date` (optional): Filter by specific date (YYYY-MM-DD)
- `month` (optional): Filter by month (1-12)
- `year` (optional): Filter by year

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "name": "string",
      "date": "YYYY-MM-DD",
      "time": "HH:mm",
      "note": "string",
      "timeToNotify": number,
      "notificationSent": boolean,
      "user": "user_id",
      "createdAt": "ISO_date_string",
      "updatedAt": "ISO_date_string"
    }
  ]
}
```

### POST /events
Create a new event.

**Request Body:**
```json
{
  "name": "string",
  "date": "YYYY-MM-DD",
  "time": "HH:mm",
  "note": "string",
  "timeToNotify": number
}
```

### PUT /events/:id
Update an existing event.

### DELETE /events/:id
Delete an event.

### GET /events/:id
Get a specific event by ID.

---

## Calendar Endpoints

### GET /calendar
Get calendar data for a specific month.

**Query Parameters:**
- `month`: Month number (1-12)
- `year`: Year (e.g., 2024)

**Response:**
```json
{
  "success": true,
  "data": {
    "month": number,
    "year": number,
    "calendar": {
      "YYYY-MM-DD": {
        "tasks": [
          {
            "id": "string",
            "title": "string",
            "category": "string",
            "startTime": "HH:mm",
            "endTime": "HH:mm",
            "isCompleted": boolean,
            "type": "task"
          }
        ],
        "events": [
          {
            "id": "string",
            "name": "string",
            "time": "HH:mm",
            "note": "string",
            "type": "event"
          }
        ],
        "notifications": [
          {
            "id": "string",
            "title": "string",
            "time": "HH:mm",
            "interval": "string",
            "type": "notification"
          }
        ]
      }
    },
    "summary": {
      "totalTasks": number,
      "completedTasks": number,
      "totalEvents": number,
      "totalNotifications": number
    }
  }
}
```

### GET /calendar/date/:date
Get detailed data for a specific date.

**Parameters:**
- `date`: Date in YYYY-MM-DD format

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "YYYY-MM-DD",
    "tasks": [...],
    "events": [...],
    "notifications": [...],
    "summary": {
      "totalTasks": number,
      "completedTasks": number,
      "totalEvents": number,
      "totalNotifications": number
    }
  }
}
```

---

## Goals Endpoints

### GET /goals
Fetch all goals for the authenticated user.

**Query Parameters:**
- `progress` (optional): Filter by progress status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "progress": "not_started|in_progress|completed|on_hold",
      "user": "user_id",
      "createdAt": "ISO_date_string",
      "updatedAt": "ISO_date_string"
    }
  ]
}
```

### POST /goals
Create a new goal.

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "progress": "not_started|in_progress|completed|on_hold"
}
```

### PUT /goals/:id
Update an existing goal.

### PUT /goals/:id/progress
Update goal progress status.

**Request Body:**
```json
{
  "progress": "not_started|in_progress|completed|on_hold"
}
```

### DELETE /goals/:id
Delete a goal.

### GET /goals/:id
Get a specific goal by ID.

---

## User Notifications Endpoints

### GET /user-notifications
Fetch all user notifications.

**Query Parameters:**
- `isActive` (optional): Filter by active status (boolean)
- `date` (optional): Filter by specific date

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "time": "HH:mm",
      "date": "YYYY-MM-DD",
      "notificationInterval": "once|daily|weekly|monthly",
      "isActive": boolean,
      "user": "user_id",
      "createdAt": "ISO_date_string",
      "updatedAt": "ISO_date_string"
    }
  ]
}
```

### POST /user-notifications
Create a new notification.

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "time": "HH:mm",
  "date": "YYYY-MM-DD",
  "notificationInterval": "once|daily|weekly|monthly"
}
```

### PUT /user-notifications/:id
Update an existing notification.

### PUT /user-notifications/:id/toggle-status
Toggle notification active status.

### DELETE /user-notifications/:id
Delete a notification.

### GET /user-notifications/:id
Get a specific notification by ID.

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Error message for this field"]
  }
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---

## Database Schema Considerations

### Users Collection/Table
```javascript
{
  _id: ObjectId,
  firstname: String,
  lastname: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Tasks Collection/Table
```javascript
{
  _id: ObjectId,
  title: String,
  category: String, // "academic", "personal", "financial"
  date: Date,
  startTime: String,
  endTime: String,
  timeToNotify: Number, // minutes before
  notes: String,
  isCompleted: Boolean,
  notificationSent: Boolean,
  user: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

### Notes Collection/Table
```javascript
{
  _id: ObjectId,
  title: String,
  note: String,
  user: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

### Events Collection/Table
```javascript
{
  _id: ObjectId,
  name: String,
  date: Date,
  time: String,
  note: String,
  timeToNotify: Number,
  notificationSent: Boolean,
  user: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Implementation Notes

1. **Authentication**: Use JWT tokens with appropriate expiration times
2. **Validation**: Implement server-side validation for all inputs
3. **Security**: Hash passwords, sanitize inputs, implement rate limiting
4. **Database**: Use appropriate indexes for performance
5. **Error Handling**: Provide meaningful error messages
6. **CORS**: Configure CORS for frontend domain
7. **Environment Variables**: Use environment variables for sensitive data

This API documentation provides a complete specification for implementing the backend services needed for Schedule Ace. The frontend is already configured to work with these endpoints through the axios client.