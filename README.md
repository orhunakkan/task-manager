# Task Manager

A simple task management application built with Node.js, Express, and MongoDB.

## Features

- Create, read, update, and delete tasks
- User authentication and authorization
- Task filtering and sorting
- File uploads for task attachments

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URL=mongodb://127.0.0.1:27017/task-manager-api
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

Start the application in development mode:
```
npm run dev
```

Or in production mode:
```
npm start
```

## Testing

Run tests:
```
npm test
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

## License

This project is licensed under the MIT License.
