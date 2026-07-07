# IBBUL Timetable Backend API

A RESTful backend API for the **IBBUL Timetable Scheduling System**, developed as part of the **3MTT Knowledge Showcase Project**. The system provides secure authentication and comprehensive management of academic entities required for automated timetable scheduling at **Ibrahim Badamasi Babangida University, Lapai (IBBUL)**.

---

## Features

- JWT Authentication & Authorization
- Role-Based Access Control (RBAC)
- User Management
- Faculty Management
- Department Management
- Programme Management
- Academic Session Management
- Semester Management
- Level Management
- Lecturer Management
- Venue Management
- Course Management
- Course Offering Management
- Course Allocation Management
- Timetable Management
- Centralized Error Handling
- Request Validation using Joi
- Modular MVC Architecture
- Supabase PostgreSQL Integration

---

## Tech Stack

- Node.js
- Express.js
- Supabase PostgreSQL
- JWT Authentication
- Joi
- bcryptjs

---

## Project Structure

```text
src/
├── database/
├── middleware/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── faculties/
│   ├── departments/
│   ├── programmes/
│   ├── levels/
│   ├── sessions/
│   ├── semesters/
│   ├── lecturers/
│   ├── venues/
│   ├── courses/
│   ├── course-offerings/
│   ├── course-allocations/
│   └── timetables/
├── routes/
├── utils/
└── app.js
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
```

### Navigate into the project

```bash
cd ibbul-timetable-backend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file:

```env
PORT=5000

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

### Run the development server

```bash
npm run dev
```

---

## Authentication

Authenticate using:

```http
POST /api/v1/auth/login
```

Include the returned access token in every protected request:

```text
Authorization: Bearer <access_token>
```

---

## API Endpoints

| Module | Endpoint |
|---------|----------|
| Authentication | `/api/v1/auth` |
| Users | `/api/v1/users` |
| Faculties | `/api/v1/faculties` |
| Departments | `/api/v1/departments` |
| Programmes | `/api/v1/programmes` |
| Levels | `/api/v1/levels` |
| Academic Sessions | `/api/v1/sessions` |
| Semesters | `/api/v1/semesters` |
| Lecturers | `/api/v1/lecturers` |
| Venues | `/api/v1/venues` |
| Courses | `/api/v1/courses` |
| Course Offerings | `/api/v1/course-offerings` |
| Course Allocations | `/api/v1/course-allocations` |
| Timetables | `/api/v1/timetables` |

Each module supports standard CRUD operations where applicable.

---

## Scheduling Constraints

The backend supports core timetable scheduling requirements, including:

- Monday–Saturday scheduling
- Time slots between **8:00 AM and 6:00 PM**
- Friday **1:00 PM – 2:00 PM** prayer break
- Lecturer availability
- Venue capacity validation
- Venue type compatibility
- Department and faculty constraints
- Group lecture support
- Course allocation management

---

## Sample Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully.",
  "data": {}
}
```

## Sample Error Response

```json
{
  "success": false,
  "message": "Validation failed."
}
```

---

## Author

**Isah Muhammad Alhaji**

Backend Developer

3MTT Knowledge Showcase Project