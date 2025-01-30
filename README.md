# Task Manager Application

A full-stack task management application built with React, Node.js, TypeScript, and MongoDB.

## 🚀 Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Axios for API requests
- TailwindCSS for styling
- Vitest for testing

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Vitest for testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.x or later)
- MongoDB (local installation)
- Docker and Docker Compose (optional)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file in the server directory
touch .env
```

Add the following environment variables to `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your-secret-key
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create .env file in the client directory
touch .env
```

Add the following to the client `.env`:
```env
REACT_APP_API_URL=http://localhost:3000/api
```

## 🚀 Running the Application

### Running with Docker (Recommended)
The easiest way to run the application is using Docker Compose:

```bash
# From the root directory
docker-compose up
```

This will start:
- MongoDB on port 27017
- Backend server on port 3000
- Frontend on port 80

### Running Locally (Development)

1. **Start MongoDB**
   - If using local MongoDB:
     ```bash
     mongod
     ```
   - Or use MongoDB Atlas (update MONGODB_URI in `.env`)

2. **Start the Backend**
```bash
cd server
npm run dev
```

3. **Start the Frontend**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api

## 🧪 Testing

### Backend Tests
```bash
cd server
npm test
```

### Frontend Tests
```bash
cd client
npm test
```

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/users/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### POST /api/users/login
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Task Endpoints
All task endpoints require Authentication header: `Bearer <token>`

#### GET /api/tasks
Get all tasks for authenticated user

#### POST /api/tasks
Create new task
```json
{
  "title": "Task title",
  "description": "Task description",
  "status": "todo",
  "dueDate": "2024-12-31"
}
```

#### PUT /api/tasks/:id
Update task
```json
{
  "title": "Updated title",
  "status": "in_progress"
}
```

#### DELETE /api/tasks/:id
Delete task

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API endpoints
- Input validation
- CORS protection

## 🧱 Project Structure

```
task-manager/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # React context providers
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
│   └── public/           # Static files
└── server/               # Backend Express application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── middleware/   # Express middleware
    │   ├── models/       # Mongoose models
    │   └── routes/       # API routes
    └── tests/            # Test files
```

## 📝 Development Notes

- Uses TypeScript for type safety
- Implements React context for state management
- TailwindCSS for responsive design
- Jest for unit and integration testing
- GitHub Actions for CI/CD
- Docker support for easy deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
