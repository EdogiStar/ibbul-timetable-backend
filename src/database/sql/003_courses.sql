-- =====================================================
-- IBBUL TIMETABLE SYSTEM
-- MODULE 3 - COURSES
-- =====================================================

-- ==========================
-- COURSES
-- ==========================
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,

    department_id UUID NOT NULL REFERENCES departments(id),

    credit_units INT NOT NULL,
    weekly_hours INT NOT NULL,

    status VARCHAR(20) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- COURSE OFFERINGS
-- Which programme/level/session offers a course
-- ==========================
CREATE TABLE IF NOT EXISTS course_offerings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    course_id UUID NOT NULL REFERENCES courses(id),
    programme_id UUID NOT NULL REFERENCES programmes(id),
    level_id UUID NOT NULL REFERENCES levels(id),
    session_id UUID NOT NULL REFERENCES academic_sessions(id),
    semester_id UUID NOT NULL REFERENCES semesters(id),

    is_compulsory BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- COURSE ALLOCATION
-- Lecturer assigned by department
-- ==========================
CREATE TABLE IF NOT EXISTS course_allocations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    course_offering_id UUID NOT NULL REFERENCES course_offerings(id),
    lecturer_id UUID NOT NULL REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- GROUP LECTURES
-- Used for GST and shared lectures
-- ==========================
CREATE TABLE IF NOT EXISTS group_lectures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,

    course_id UUID NOT NULL REFERENCES courses(id),

    group_type VARCHAR(20) NOT NULL, -- GST or MINI_GROUP

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- GROUP PARTICIPANTS
-- Example:
-- GST111 Group A
-- GST111 Group B
-- ==========================
CREATE TABLE IF NOT EXISTS group_lecture_participants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    group_lecture_id UUID NOT NULL REFERENCES group_lectures(id),

    programme_id UUID NOT NULL REFERENCES programmes(id),

    level_id UUID NOT NULL REFERENCES levels(id),

    group_name VARCHAR(30) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);