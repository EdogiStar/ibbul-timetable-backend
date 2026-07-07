# Database Design

## Overview

The IBBUL Timetable Scheduling System uses a **PostgreSQL** database designed with a modular architecture to support academic management, timetable scheduling, and role-based access control. The schema is optimized for scalability, data integrity, and efficient scheduling operations.

---

## Design Principles

- PostgreSQL relational database
- UUID primary keys
- Foreign key relationships
- Human-readable unique codes
- Audit timestamps
- Role-Based Access Control (RBAC)
- Modular SQL structure
- Rule-driven timetable scheduling

---

## Database Modules

### 001_core.sql
Core system tables:
- Roles
- Users
- Authentication

### 002_academics.sql
Academic structure:
- Faculties
- Departments
- Programmes
- Levels
- Academic Sessions
- Semesters

### 003_courses.sql
Course management:
- Courses
- Course Offerings
- Course Allocations
- Group Lectures

### 004_venues.sql
Venue management:
- Buildings
- Venue Types
- Venues
- Venue Permissions
- Venue Unavailability

### 005_timetable.sql
Timetable management:
- Timetable Versions
- Timetable Entries
- Days
- Time Slots
- Change Requests

### 006_scheduler.sql
Scheduling engine:
- Scheduling Jobs
- Scheduling Rules
- Rule Results
- Scheduler Statistics

### 007_seed_data.sql
Initial system data:
- Roles
- Days
- Time Slots
- Default Configuration

---

# Core Tables

## Roles
Stores all system roles and permissions.

**Key Fields**
- id
- code
- name
- description
- status
- created_at
- updated_at

Relationship:
- One role can be assigned to many users.

---

## Users
Stores authenticated users of the system.

**Key Fields**
- id
- code
- full_name
- email
- password_hash
- phone
- role_id
- staff_number
- matric_number
- status
- created_at
- updated_at

Relationship:
- Belongs to a role.

---

# Academic Tables

- Faculties
- Departments
- Programmes
- Levels
- Academic Sessions
- Semesters

These tables define the university's academic hierarchy and are referenced by courses, lecturers, and timetable records.

---

# Course Management

The course module manages:

- Courses
- Course Offerings
- Course Allocations
- Group Lectures

It links lecturers to courses and specifies which programmes, levels, sessions, and semesters a course is offered.

---

# Venue Management

Venue-related tables include:

- Buildings
- Venue Types
- Venues
- Venue Permissions
- Venue Unavailability

These tables ensure that lectures are assigned to suitable venues based on capacity, availability, and venue type.

---

# Timetable Management

Timetable scheduling is managed through:

- Timetable Versions
- Timetable Entries
- Days
- Time Slots
- Timetable Change Requests

These tables store lecture schedules and support versioning and timetable updates.

---

# Scheduling Engine

The scheduling engine consists of:

- Scheduling Jobs
- Scheduling Rules
- Rule Results
- Scheduler Statistics

These components validate timetable constraints, execute scheduling operations, and record scheduling outcomes.

---

# Key Relationships

- One Faculty → Many Departments
- One Department → Many Programmes
- One Department → Many Courses
- One Department → Many Lecturers
- One Programme → Many Course Offerings
- One Course → Many Course Offerings
- One Course Offering → One Lecturer Allocation
- One Venue → Many Timetable Entries
- One Lecturer → Many Timetable Entries
- One Role → Many Users

---

## Summary

The database is organized into independent modules that separate authentication, academic management, course administration, venue management, timetable generation, and scheduling. This modular structure improves maintainability, scalability, and supports efficient timetable generation while preserving data integrity through foreign key constraints.