/**
 * ------------------------------------------------------------------
 * Session Generator
 * ------------------------------------------------------------------
 * Converts course offerings into lecture sessions.
 * These lecture sessions are what the scheduler places.
 * ------------------------------------------------------------------
 */

/**
 * Split weekly hours into sessions.
 *
 * Examples:
 * 3 hrs, 2 sessions -> [2, 1]
 * 4 hrs, 2 sessions -> [2, 2]
 * 5 hrs, 3 sessions -> [2, 2, 1]
 */
function splitHours(hoursPerWeek, sessionsPerWeek) {

    const durations = [];

    let remainingHours = hoursPerWeek;
    let remainingSessions = sessionsPerWeek;

    while (remainingSessions > 0) {

        const duration = Math.ceil(
            remainingHours / remainingSessions
        );

        durations.push(duration);

        remainingHours -= duration;
        remainingSessions--;

    }

    return durations;

}


/**
 * Generate lecture sessions from course offerings.
 */
function generateSessions(courseOfferings) {

    const sessions = [];

    for (const course of courseOfferings) {

        const durations = splitHours(

            course.hours_per_week,
            course.sessions_per_week

        );


        durations.forEach((duration, index) => {

            sessions.push({

                // Course
                courseId: course.course_id,
                courseOfferingId: course.course_offering_id,

                courseCode: course.course_code,
                courseTitle: course.course_title,

                // Academic Information
                programmeId: course.programme_id,
                levelId: course.level_id,
                sessionId: course.session_id,
                semesterId: course.semester_id,

                departmentId: course.department_id,
                facultyId: course.faculty_id,

// Scheduling Information
studentCount: course.student_count,
venueType: course.preferred_venue_type,

lecturerId: course.lecturer_id || null,
courseAllocationId: course.course_allocation_id || null,
                // Session Information
                duration,
                sessionNumber: index + 1

            });

        });

    }

    return sessions;

}


module.exports = {
    generateSessions
};