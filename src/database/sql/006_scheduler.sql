-- =====================================================
-- IBBUL TIMETABLE SYSTEM
-- MODULE 6 - SCHEDULER
-- =====================================================

-- ==========================
-- SCHEDULING JOBS
-- ==========================
CREATE TABLE IF NOT EXISTS scheduling_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(30) UNIQUE NOT NULL,

    faculty_id UUID NOT NULL REFERENCES faculties(id),

    session_id UUID NOT NULL REFERENCES academic_sessions(id),

    semester_id UUID NOT NULL REFERENCES semesters(id),

    timetable_version_id UUID REFERENCES timetable_versions(id),

    status VARCHAR(20) DEFAULT 'PENDING',

    created_by UUID REFERENCES users(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    completed_at TIMESTAMP
);

-- ==========================
-- SCHEDULING RULES
-- ==========================
CREATE TABLE IF NOT EXISTS scheduling_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    code VARCHAR(50) UNIQUE NOT NULL,

    name VARCHAR(150) NOT NULL,

    description TEXT,

    priority INT DEFAULT 1,

    is_enabled BOOLEAN DEFAULT TRUE
);

-- ==========================
-- RULE RESULTS
-- ==========================
CREATE TABLE IF NOT EXISTS rule_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    scheduling_job_id UUID NOT NULL REFERENCES scheduling_jobs(id) ON DELETE CASCADE,

    rule_id UUID NOT NULL REFERENCES scheduling_rules(id),

    result VARCHAR(20) NOT NULL,

    message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- SCHEDULER STATISTICS
-- ==========================
CREATE TABLE IF NOT EXISTS scheduler_statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    scheduling_job_id UUID NOT NULL REFERENCES scheduling_jobs(id) ON DELETE CASCADE,

    courses_scheduled INT DEFAULT 0,

    conflicts_found INT DEFAULT 0,

    warnings_generated INT DEFAULT 0,

    venues_used INT DEFAULT 0,

    lecturers_assigned INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- DEFAULT RULES
-- ==========================
INSERT INTO scheduling_rules (code, name, description, priority)
VALUES
('LECTURER_CONFLICT', 'Lecturer Conflict', 'A lecturer cannot teach two classes at the same time.', 1),
('VENUE_CONFLICT', 'Venue Conflict', 'A venue cannot be double-booked.', 2),
('LEVEL_CONFLICT', 'Level Conflict', 'Students in the same level cannot have overlapping compulsory classes.', 3),
('GROUP_LECTURE', 'Group Lecture', 'Validate university-wide and mini-group lecture scheduling.', 4),
('MULTI_HOUR', 'Multi-hour Session', 'Ensure multi-hour classes are scheduled consecutively.', 5),
('VENUE_PERMISSION', 'Venue Permission', 'Respect faculty-owned and shared venue permissions.', 6),
('PRACTICAL_WARNING', 'Practical Warning', 'Flag practical courses scheduled in unsuitable venues.', 7)
ON CONFLICT (code) DO NOTHING;