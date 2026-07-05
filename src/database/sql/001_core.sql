-- =====================================================
-- IBBUL TIMETABLE SYSTEM
-- MODULE 1 - CORE TABLES
-- =====================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================
-- ROLES
-- ==========================
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- USERS
-- ==========================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(30) UNIQUE NOT NULL,

    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash TEXT NOT NULL,

    phone VARCHAR(20),

    staff_number VARCHAR(30) UNIQUE,

    matric_number VARCHAR(30) UNIQUE,

    role_id UUID NOT NULL REFERENCES roles(id),

    status VARCHAR(20) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- DEFAULT ROLES
-- ==========================
INSERT INTO roles (code, name, description)
VALUES
('SUPER_ADMIN', 'Super Administrator', 'Full system access'),
('FACULTY_OFFICER', 'Faculty Scheduling Officer', 'Faculty timetable management'),
('DEPARTMENT_OFFICER', 'Department Course Allocation Officer', 'Department course allocation'),
('LECTURER', 'Lecturer', 'Academic staff'),
('STUDENT', 'Student', 'Student')
ON CONFLICT (code) DO NOTHING;