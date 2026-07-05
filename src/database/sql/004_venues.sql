-- =====================================================
-- IBBUL TIMETABLE SYSTEM
-- MODULE 4 - BUILDINGS & VENUES
-- =====================================================

-- ==========================
-- BUILDINGS
-- ==========================
CREATE TABLE IF NOT EXISTS buildings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,

    status VARCHAR(20) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- VENUE TYPES
-- ==========================
CREATE TABLE IF NOT EXISTS venue_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO venue_types(code, name)
VALUES
('CLASSROOM','Classroom'),
('LECTURE_HALL','Lecture Hall'),
('LABORATORY','Laboratory'),
('COMPUTER_LAB','Computer Laboratory'),
('STUDIO','Studio'),
('WORKSHOP','Workshop'),
('AUDITORIUM','Auditorium'),
('SPECIAL','Special Venue')
ON CONFLICT (code) DO NOTHING;

-- ==========================
-- VENUES
-- ==========================
CREATE TABLE IF NOT EXISTS venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(20) UNIQUE NOT NULL,

    name VARCHAR(150) NOT NULL,

    building_id UUID REFERENCES buildings(id),

    venue_type_id UUID REFERENCES venue_types(id),

    faculty_id UUID REFERENCES faculties(id),

    is_shared BOOLEAN DEFAULT FALSE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- VENUE PERMISSIONS
-- Which faculties can use a venue
-- ==========================
CREATE TABLE IF NOT EXISTS venue_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    venue_id UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,

    faculty_id UUID NOT NULL REFERENCES faculties(id)