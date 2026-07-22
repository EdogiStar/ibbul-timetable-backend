const repository = require("./repository");

const {
    generateSessions
} = require("../sessionGenerator");

const {
    findPlacement
} = require("../backtracking");


class NormalScheduler {

    /**
     * ----------------------------------------------------------
     * Generate Normal Timetable
     * ----------------------------------------------------------
     *
     * Supports two modes:
     *
     * 1. Bulk Scheduling
     *    Schedules all eligible normal courses.
     *
     * 2. Selected Scheduling
     *    Schedules only the selected course allocations.
     *
     * The actual scheduling logic remains inside this
     * scheduling-engine module.
     *
     * ----------------------------------------------------------
     */

    async generate(options = {}) {


        /**
         * ------------------------------------------------------
         * Scheduling Options
         * ------------------------------------------------------
         */

        const {

            courseAllocationIds = null,

            targetSlot = null

        } = options;


        /**
         * ------------------------------------------------------
         * Load Required Data
         * ------------------------------------------------------
         */

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


        /**
         * ------------------------------------------------------
         * Containers
         * ------------------------------------------------------
         */

        const entries = [];


        /**
         * ------------------------------------------------------
         * Scheduling Statistics
         * ------------------------------------------------------
         */

        let skippedSessions = 0;

        let scheduledSessions = 0;

        let failedSessions = 0;


        /**
         * ------------------------------------------------------
         * Continue in Part 2...
         * ------------------------------------------------------
         */
        
                 /**
         * ------------------------------------------------------
         * Remove Courses Already Handled By Group Scheduler
         * ------------------------------------------------------
         *
         * Group lectures have their own scheduler.
         *
         * Therefore, courses already used in a group lecture
         * should not be scheduled again by the normal scheduler.
         * ------------------------------------------------------
         */

        const groupCourseIds =

            groupLectures.map(

                item => item.course_id

            );


        let normalOfferings =

            courseOfferings.filter(

                offering =>

                    !groupCourseIds.includes(

                        offering.course_id

                    )

            );


        /**
         * ------------------------------------------------------
         * Filter By Selected Course Allocations
         * ------------------------------------------------------
         *
         * If courseAllocationIds are provided:
         *
         *     Schedule only those selected allocations.
         *
         * If courseAllocationIds are not provided:
         *
         *     Schedule all eligible normal course offerings.
         *
         * This allows the same scheduler to support:
         *
         * 1. Bulk timetable generation
         *
         * 2. Single course scheduling
         *
         * 3. Multiple selected course scheduling
         *
         * ------------------------------------------------------
         */

        if (

            Array.isArray(courseAllocationIds) &&

            courseAllocationIds.length > 0

        ) {

            normalOfferings =

                normalOfferings.filter(

                    offering =>

                        courseAllocations.some(

                            allocation =>

                                allocation.course_offering_id ===
                                    offering.id &&

                                courseAllocationIds.includes(

                                    allocation.id

                                )

                        )

                );

        }


        /**
         * ------------------------------------------------------
         * Prepare Courses For Scheduling
         * ------------------------------------------------------
         *
         * Attach all information required by the scheduler.
         *
         * ------------------------------------------------------
         */

        const preparedCourses =

            normalOfferings

                .map(

                    offering => {


                        /**
                         * Find Course
                         */

                        const course =

                            courses.find(

                                item =>

                                    item.id ===
                                    offering.course_id

                            );


                        if (!course) {

                            return null;

                        }


                        /**
                         * Find Department
                         */

                        const department =

                            departments.find(

                                item =>

                                    item.id ===
                                    course.department_id

                            );


                        /**
                         * Find Course Allocation
                         */

                        const allocation =

                            courseAllocations.find(

                                item =>

                                    item.course_offering_id ===
                                    offering.id

                            );


                        /**
                         * Return Scheduler Input
                         */

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

                                department?.faculty_id ||
                                null,


                            lecturer_id:

                                allocation?.lecturer_id ||
                                null,


                            course_allocation_id:

                                allocation?.id ||
                                null

                        };


                    }

                )


                /**
                 * Remove invalid courses
                 */

                .filter(Boolean);


        /**
         * ------------------------------------------------------
         * Continue in Part 3...
         * ------------------------------------------------------
         */
        
                 /**
         * ------------------------------------------------------
         * Generate Schedulable Sessions
         * ------------------------------------------------------
         *
         * Each course may require multiple sessions per week.
         *
         * sessionGenerator converts the prepared courses
         * into individual schedulable sessions.
         *
         * Example:
         *
         * Course requires 2 sessions per week
         *
         *        ↓
         *
         * Session 1
         * Session 2
         *
         * Each session will be scheduled independently.
         *
         * ------------------------------------------------------
         */

        const sessions =

            generateSessions(

                preparedCourses

            );


        /**
         * ------------------------------------------------------
         * Total Sessions Before Filtering
         * ------------------------------------------------------
         */

        const totalSessions =

            sessions.length;


        /**
         * ------------------------------------------------------
         * Find Already Scheduled Sessions
         * ------------------------------------------------------
         *
         * We use course_offering_id + session_number
         * to identify a specific course session.
         *
         * Group timetable entries are ignored because
         * group lectures are handled separately.
         *
         * ------------------------------------------------------
         */

        const scheduledKeys =

            timetableEntries

                .filter(

                    entry =>

                        !entry.is_group

                )

                .map(

                    entry =>

                        `${entry.course_offering_id}-${entry.session_number}`

                );


        /**
         * ------------------------------------------------------
         * Remove Already Scheduled Sessions
         * ------------------------------------------------------
         *
         * This prevents duplicate timetable entries when
         * the scheduler is run again.
         *
         * ------------------------------------------------------
         */

        let sessionsToSchedule =

            sessions.filter(

                session => {


                    const key =

                        `${session.courseOfferingId}-${session.sessionNumber}`;


                    /**
                     * Session already exists
                     */

                    if (

                        scheduledKeys.includes(key)

                    ) {

                        skippedSessions++;

                        return false;

                    }


                    /**
                     * Session still needs scheduling
                     */

                    return true;

                }

            );


        /**
         * ------------------------------------------------------
         * Continue in Part 4...
         * ------------------------------------------------------
         */
        