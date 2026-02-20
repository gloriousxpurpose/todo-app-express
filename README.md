# Task Manager API

A RESTful backend API for a task management application, built with **Node.js**, **Express**, and **PostgreSQL**. Features JWT-based authentication, role-based access control, and email verification via Brevo.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express v5 |
| Database | PostgreSQL (`pg`) |
| Auth | JSON Web Tokens (`jsonwebtoken`) |
| Password Hashing | `bcrypt` |
| Email | Brevo (`@getbrevo/brevo`) |
| Dev Server | `nodemon` |

## Project Structure

```
src/
├── index.js          # App entry point
├── config/           # App configuration (port, env vars)
├── controllers/      # Route handler logic
│   ├── user.controller.js
│   └── task.controller.js
├── middlewares/      # Auth & role guard middleware
│   ├── auth.middleware.js
│   └── role.middleware.js
├── models/           # Database query models
├── routes/           # Express route definitions
│   ├── user.route.js
│   └── task.route.js
├── services/         # Business logic / external services
├── database/         # DB connection setup
└── utils/            # Helper utilities
```

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL database
- A [Brevo](https://www.brevo.com/) account (for email verification)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd task-manager-pg-express

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port (default: `5432`) |
| `DB_NAME` | Database name |
| `DB_USER` | Database user |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g. `7d`) |
| `BREVO_API_KEY` | Brevo API key for sending emails |
| `MAILER_DEFAULT_SENDER_EMAIL` | Sender email address |

### Running the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server starts at `http://localhost:<PORT>`.

---

## API Endpoints

### Auth & Users

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| `POST` | `/register` | ❌ | — | Register a new user |
| `POST` | `/login` | ❌ | — | Login and receive JWT |
| `GET` | `/verify-email` | ❌ | — | Verify email address |
| `GET` | `/me` | ✅ | — | Get current user profile |
| `GET` | `/user` | ✅ | Admin | Get all users |
| `GET` | `/user/:userId` | ✅ | — | Get user by ID |
| `PUT` | `/user/:userId` | ✅ | — | Update user |
| `DELETE` | `/user/:userId` | ✅ | Admin | Delete user |

### Tasks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/task` | ✅ | Get all tasks for current user |
| `POST` | `/task` | ✅ | Create a new task |
| `GET` | `/task/:taskId` | ✅ | Get task by ID |
| `PATCH` | `/task/:taskId` | ✅ | Update task details |
| `PATCH` | `/status/:taskId` | ✅ | Update task status |
| `DELETE` | `/task/:taskId` | ✅ | Delete a task |

> **Auth**: All protected routes require an `Authorization: Bearer <token>` header.

---

## License

ISC
