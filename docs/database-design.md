# IBBUL Timetable Scheduling System

## Database Design

### Overview

This document describes the database architecture for the IBBUL Timetable Scheduling System.

### Design Principles

- PostgreSQL Database
- UUID primary keys
- Human-readable unique codes
- Soft delete support
- Lifecycle status tracking
- Audit fields
- Role-Based Access Control (RBAC)
- Modular database design
- Rule-driven scheduling engine

---

## SQL Modules

001_core.sql

- Roles
- Users
- Authentication support

002_academics.sql

- Faculties
- Departments
- Programmes
- Levels
- Sessions
- Semesters
- Student Cohorts

003_courses.sql

- Courses
- Course Offerings
- Course Allocation
- Group Lectures
- Borrowed Courses

004_venues.sql

- Buildings
- Venue Types
- Venues
- Venue Permissions
- Venue Availability

005_timetable.sql

- Timetable Versions
- Timetable Entries
- Days
- Time Slots
- Change Requests

006_scheduler.sql

- Scheduling Jobs
- Scheduling Rules
- Rule Results
- Statistics

007_seed_data.sql

- Roles
- Days
- Time Slots
- Default Configuration
# Core Tables

## roles

Purpose:
Stores all system roles.

Columns

- id (UUID, Primary Key)
- code (TEXT, UNIQUE)
- name (TEXT)
- description (TEXT)
- status (TEXT)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)

Relationships

- One role has many users.

---

## users

Purpose:
Stores all system users.

Columns

- id (UUID, Primary Key)
- code (TEXT, UNIQUE)
- email (TEXT, UNIQUE)
- password_hash (TEXT)
- full_name (TEXT)
- phone_number (TEXT)
- role_id (UUID → roles.id)
- faculty_id (UUID → faculties.id, nullable)
- department_id (UUID → departments.id, nullable)
- staff_number (TEXT, nullable)
- matric_number (TEXT, nullable)
- status (TEXT)
- created_by (UUID, nullable)
- updated_by (UUID, nullable)
- deleted_by (UUID, nullable)
- created_at (TIMESTAMPTZ)
- updated_at (TIMESTAMPTZ)
- deleted_at (TIMESTAMPTZ, nullable)