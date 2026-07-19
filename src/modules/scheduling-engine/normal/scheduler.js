const repository = require("./repository");
const { generateSessions } = require("../sessionGenerator");
const { findPlacement } = require("../backtracking");

class NormalScheduler {

    async generate() {

        const [

            courseOfferings,
            courses,
            departments,
            courseAllocations,
            groupLectures,
            days,
            timeSlots,
            venues,
            timetableEntries

        ] = await Promise.all([

            repository.getCourseOfferings(),
            repository.getCourses(),
            repository.getDepartments(),
            repository.getCourseAllocations(),
            repository.getGroupLectures(),
            repository.getDays(),
            repository.getTimeSlots(),
            repository.getVenues(),
            repository.getExistingTimetable()

        ]);


        const entries = [];

        let skippedSessions = 0;
        let scheduledSessions = 0;
        let failedSessions = 0;


        /**
         * ----------------------------------------------------------
         * Remove courses already handled by group scheduler
         * ----------------------------------------------------------
         */

        const groupCourseIds =
            groupLectures.map(
                item => item.course_id
            );


        const normalOfferings =
            courseOfferings.filter(
                offering =>
                    !groupCourseIds.includes(
                        offering.course_id
                    )
            );


        /**
         * ----------------------------------------------------------
         * Attach extra information needed by scheduler
         * ----------------------------------------------------------
         */

        const preparedCourses =
            normalOfferings
                .map(offering => {

                    const course =
                        courses.find(
                            item =>
                                item.id === offering.course_id
                        );

                    if (!course) {
                        return null;
                    }

                    const department =
                        departments.find(
                            item =>
                                item.id === course.department_id
                        );

                    const allocation =
                        courseAllocations.find(
                            item =>
                                item.course_offering_id === offering.id
                        );

                    return {

                        ...course,

                        course_id:
                            course.id,

                        course_offering_id:
                            offering.id,

                        programme_id:
                            offering.programme_id,

                        level_id:
                            offering.level_id,

                        session_id:
                            offering.session_id,

                        semester_id:
                            offering.semester_id,

                        department_id:
                            course.department_id,

                        faculty_id:
                            department?.faculty_id || null,

                        lecturer_id:
                            allocation?.lecturer_id || null,

                        course_allocation_id:
                            allocation?.id || null

                    };

                })
                .filter(Boolean);

        // Continue in Part 2...
        
                /**
         * ----------------------------------------------------------
         * Generate schedulable sessions
         * ----------------------------------------------------------
         */

        console.log("\nPrepared Courses:");
        console.log(preparedCourses);

        let sessions =
            generateSessions(
                preparedCourses
            );

        console.log("\nGenerated Sessions:");
        console.log(sessions);

        const totalSessions =
            sessions.length;


        /**
         * ----------------------------------------------------------
         * Option A
         * Skip sessions already scheduled
         * ----------------------------------------------------------
         */

        const scheduledKeys =
            timetableEntries
                .filter(
                    entry => !entry.is_group
                )
                .map(
                    entry =>
                        `${entry.course_offering_id}-${entry.session_number}`
                );


        sessions =
            sessions.filter(session => {

                const key =
                    `${session.courseOfferingId}-${session.sessionNumber}`;

                if (scheduledKeys.includes(key)) {

                    skippedSessions++;

                    return false;

                }

                return true;

            });


        /**
         * ----------------------------------------------------------
         * Schedule remaining sessions
         * ----------------------------------------------------------
         */

        for (const session of sessions) {

            const placement =
                findPlacement({

                    session,

                    days,

                    timeSlots,

                    venues,

                    timetableEntries,

                    isGroupSchedule: false

                });


            /**
             * No valid placement found
             */
            if (!placement) {

                console.log("\nUnable to schedule session:");
                console.log(session);

                failedSessions++;

                continue;

            }

            scheduledSessions++;


            /**
             * Select the first available venue
             */
            const venue =
                placement.suitableVenues[0];

            // Continue in Part 3...
            
                        /**
             * ----------------------------------------------------------
             * Create timetable entries
             * ----------------------------------------------------------
             */

            for (const slot of placement.slots) {

                const entry = {

                    course_id:
                        session.courseId,

                    lecturer_id:
                        session.lecturerId,

                    department_id:
                        session.departmentId,

                    faculty_id:
                        session.facultyId,

                    venue_id:
                        venue.id,

                    is_group:
                        false,

                    group_lecture_id:
                        null,

                    group_participant_id:
                        null,

                    is_locked:
                        false,

                    programme_id:
                        session.programmeId,

                    course_offering_id:
                        session.courseOfferingId,

                    level_id:
                        session.levelId,

                    session_id:
                        session.sessionId,

                    semester_id:
                        session.semesterId,

                    day_id:
                        placement.day.id,

                    time_slot_id:
                        slot.id,

                    course_allocation_id:
                        session.courseAllocationId,

                    session_number:
                        session.sessionNumber

                };


                entries.push(entry);


                /**
                 * Update in-memory timetable so the
                 * next session sees these placements.
                 */
                timetableEntries.push(entry);

            }

        }

        // Continue in Part 4...
        
                /**
         * ----------------------------------------------------------
         * Persist new timetable entries
         * ----------------------------------------------------------
         */

        for (const entry of entries) {

            await repository.saveEntry(entry);

        }


        /**
         * ----------------------------------------------------------
         * Scheduling Summary
         * ----------------------------------------------------------
         */

        return {

            success: true,

            totalSessions,

            skippedSessions,

            scheduledSessions,

            failedSessions,

            createdEntries:
                entries.length

        };

    }

}

module.exports = new NormalScheduler();