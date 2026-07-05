-- =====================================================
-- IBBUL TIMETABLE SYSTEM
-- MODULE 5 - TIMETABLE
-- =====================================================

-- ==========================
-- DAYS
-- ==========================
CREATE TABLE IF NOT EXISTS days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(20) NOT NULL,
    sort_order INT NOT NULL
);

INSERT INTO days(code, name, sort_order)
VALUES
('MON','Monday',1),
('TUE','Tuesday',2),
('WED','Wednesday',3),
('THU','Thursday',4),
('FRI','Friday',5)
ON CONFLICT (code) DO NOTHING;

-- ==========================
-- TIME SLOTS
-- ==========================
CREATE TABLE IF NOT EXISTS time_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(20) UNIQUE NOT NULL,

    start_time TIME NOT NULL,

    end_time TIME NOT NULL,

    sort_order INT NOT NULL
);

-- ==========================
-- TIMETABLE VERSIONS
-- ==========================
CREATE TABLE IF NOT EXISTS timetable_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(30) UNIQUE NOT NULL,

    faculty_id UUID NOT NULL REFERENCES faculties(id),

    session_id UUID NOT NULL REFERENCES academic_sessions(id),

    semester_id UUID NOT NULL REFERENCES semesters(id),

    version_number INT DEFAULT 1,

    status VARCHAR(20) DEFAULT 'DRAFT',

    created_by UUID REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- TIMETABLE ENTRIES
-- ==========================
CREATE TABLE IF NOT EXISTS timetable_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    timetable_version_id UUID NOT NULL REFERENCES timetable_versions(id) ON DELETE CASCADE,

    course_offering_id UUID NOT NULL REFERENCES course_offerings(id),

    lecturer_id UUID NOT NULL REFERENCES users(id),

    venue_id UUID NOT NULL REFERENCES venues(id),

    day_id UUID NOT NULL REFERENCES days(id),

    time_slot_id UUID NOT NULL REFERENCES time_slots(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- TIMETABLE CHANGE REQUESTS
-- ==========================
CREATE TABLE IF NOT EXISTS timetable_change_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    timetable_entry_id UUID NOT NULL REFERENCES timetable_entries(id) ON DELETE CASCADE,

    requested_by UUID NOT NULL REFERENCES users(id),

    reason TEXT NOT NULL,

    status VARCHAR(20) DEFAULT 'PENDING',

    reviewed_by UUID REFERENCES users(id),

    reviewed_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);