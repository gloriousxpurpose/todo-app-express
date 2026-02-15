# Task Management API

A RESTful API built with Express.js and PostgreSQL for managing tasks with user authentication and email verification.

## 🚀 Features

- **User Authentication**
  - User registration with email verification
  - JWT-based authentication
  - Secure password hashing with bcrypt
  - Email verification via Brevo (formerly Sendinblue)

- **Task Management**
  - Create, read, update, and delete tasks
  - Task filtering by priority (High, Medium, Low)
  - Task search functionality
  - Sort tasks by creation date (ascending/descending)
  - Update task completion status
  - User-specific task isolation

- **Security**
  - JWT token-based authorization
  - Password encryption
  - CORS enabled
  - Protected routes with middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/lukiraki/task-pg-express.git
   cd task-pg-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_NAME=your_database_name
   DB_PASSWORD=your_database_password
   DB_PORT=5432
   DB_USER=your_database_user

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h

   # Email Configuration (Brevo)
   BREVO_API_KEY=your_brevo_api_key
   MAILER_DEFAULT_SENDER_EMAIL=your_sender_email@example.com

   # Application URL
   APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   Create a PostgreSQL database and run the necessary migrations to set up the required tables for users and tasks.

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```
The server will start with nodemon for auto-reloading on file changes.

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Verify Email
```http
GET /users/verify/:token
```

#### Get Current User
```http
GET /users/me
Authorization: Bearer <jwt_token>
```

### Task Endpoints

All task endpoints require authentication via JWT token in the Authorization header.

#### Get All Tasks
```http
GET /tasks?priority=High&sortOrder=desc&search=keyword
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `priority` (optional): Filter by priority (High, Medium, Low)
- `sortOrder` (optional): Sort order (asc, desc)
- `search` (optional): Search keyword

#### Get Task by ID
```http
GET /tasks/:taskId
Authorization: Bearer <jwt_token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "deadline": "2026-12-31",
  "priority": "High",
  "is_done": false
}
```

#### Update Task
```http
PUT /tasks/:taskId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated task title",
  "deadline": "2026-12-31",
  "priority": "Medium"
}
```

#### Update Task Status
```http
PATCH /tasks/:taskId/status
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "is_done": true
}
```

#### Delete Task
```http
DELETE /tasks/:taskId
Authorization: Bearer <jwt_token>
```

## 🏗️ Project Structure

```
task-pg-express/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   │   ├── task.controller.js
│   │   └── user.controller.js
│   ├── database/        # Database connection
│   ├── middlewares/     # Custom middleware (auth, validation)
│   ├── models/          # Database models
│   │   ├── task.model.js
│   │   └── user.model.js
│   ├── routes/          # API routes
│   │   ├── index.js
│   │   ├── task.route.js
│   │   └── user.route.js
│   ├── services/        # Business logic (email service)
│   ├── utils/           # Utility functions (response handlers)
│   └── index.js         # Application entry point
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Technologies Used

- **Backend Framework:** Express.js v5.2.1
- **Database:** PostgreSQL with `pg` driver
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Email Service:** Brevo (formerly Sendinblue)
- **Development:** Nodemon for auto-reloading
- **Security:** CORS enabled
- **UUID:** For unique identifiers

## 🔐 Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Protected routes with authentication middleware
- CORS configuration for cross-origin requests
- Environment variables for sensitive data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Express.js community
- PostgreSQL documentation
- Brevo email service
