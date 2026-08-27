const repository =
    require("./repository");

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
     * Supports:
     *
     * 1. Bulk scheduling
     *
     *    generate()
     *
     * 2. Single allocation scheduling
     *
     *    generate({
     *        courseAllocationId,
     *        targetSlot
     *    })
     *
     * ----------------------------------------------------------
     */
    async generate({

        courseAllocationId = null,

        targetSlot = null

    } = {}) {


        /**
         * ------------------------------------------------------
         * Load Scheduling Data
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
         * Determine Scheduling Mode
         * ------------------------------------------------------
         */

        const isSingleMode =
            Boolean(courseAllocationId);


        /**
         * ------------------------------------------------------
         * Remove Courses Already Handled
         * By Group Scheduler
         * ------------------------------------------------------
         */

        const groupCourseIds =
            groupLectures.map(
                item =>
                    item.course_id
            );


        /**
         * ------------------------------------------------------
         * Prepare Normal Course Offerings
         * ------------------------------------------------------
         */

        let normalOfferings =
            courseOfferings.filter(

                offering =>

                    !groupCourseIds.includes(
                        offering.course_id
                    )

            );


        /**
         * ------------------------------------------------------
         * SINGLE MODE
         * ------------------------------------------------------
         *
         * Existing allocation-based scheduler.
         *
         * This path is kept for the existing
         * generateNormalTimetableForOne()
         * functionality.
         * ------------------------------------------------------
         */

        if (isSingleMode) {

            const allocation =
                courseAllocations.find(

                    item =>

                        item.id ===
                        courseAllocationId

                );


            if (!allocation) {

                throw new Error(
                    "Course allocation not found."
                );

            }


            normalOfferings =
                normalOfferings.filter(

                    offering =>

                        offering.id ===
                        allocation.course_offering_id

                );


            if (
                normalOfferings.length === 0
            ) {

                throw new Error(
                    "The selected course allocation is not eligible for normal scheduling."
                );

            }

        }


        /**
         * ------------------------------------------------------
         * Attach Required Scheduling Information
         * ------------------------------------------------------
         */

        const preparedCourses =

            normalOfferings

                .map(offering => {


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
                     *
                     * Allocation remains optional
                     * for bulk scheduling.
                     */

                    const allocation =

                        isSingleMode

                            ? courseAllocations.find(

                                item =>

                                    item.id ===
                                    courseAllocationId

                            )

                            : courseAllocations.find(

                                item =>

                                    item.course_offering_id ===
                                    offering.id

                            );


                    return {

                        ...course,


                        /**
                         * Course Information
                         */

                        course_id:
                            course.id,

                        course_offering_id:
                            offering.id,


                        /**
                         * Academic Structure
                         */

                        programme_id:
                            offering.programme_id,

                        level_id:
                            offering.level_id,

                        session_id:
                            offering.session_id,

                        semester_id:
                            offering.semester_id,


                        /**
                         * Department / Faculty
                         */

                        department_id:
                            course.department_id,

                        faculty_id:
                            department?.faculty_id ||
                            null,


                        /**
                         * Lecturer
                         *
                         * NULL is allowed when the
                         * course has no allocation.
                         */

                        lecturer_id:
                            allocation?.lecturer_id ||
                            null,


                        /**
                         * Allocation
                         */

                        course_allocation_id:
                            allocation?.id ||
                            null

                    };

                })

                .filter(Boolean);


        /**
         * ------------------------------------------------------
         * No Course Found
         * ------------------------------------------------------
         */

        if (
            preparedCourses.length === 0
        ) {

            throw new Error(
                "No eligible normal course found for scheduling."
            );

        }


        /**
         * ------------------------------------------------------
         * Generate Sessions
         * ------------------------------------------------------
         */

        let sessions =

            generateSessions(
                preparedCourses
            );


        /**
         * ------------------------------------------------------
         * Single Mode Validation
         * ------------------------------------------------------
         */

        if (isSingleMode) {

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


            sessions =

                sessions.filter(

                    session => {

                        const key =

                            `${session.courseOfferingId}-${session.sessionNumber}`;


                        return !scheduledKeys.includes(
                            key
                        );

                    }

                );


            if (
                sessions.length === 0
            ) {

                throw new Error(
                    "All sessions for this course allocation have already been scheduled."
                );

            }


            sessions = [

                sessions[0]

            ];

        }


        /**
         * ------------------------------------------------------
         * Statistics
         * ------------------------------------------------------
         */

        const entries = [];

        let skippedSessions = 0;

        let scheduledSessions = 0;

        let failedSessions = 0;


        const totalSessions =
            sessions.length;


        /**
         * ------------------------------------------------------
         * Get Already Scheduled Sessions
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
         *
         * Only relevant to bulk mode.
         * ------------------------------------------------------
         */

        if (!isSingleMode) {

            sessions =

                sessions.filter(

                    session => {

                        const key =

                            `${session.courseOfferingId}-${session.sessionNumber}`;


                        if (
                            scheduledKeys.includes(
                                key
                            )
                        ) {

                            skippedSessions++;

                            return false;

                        }


                        return true;

                    }

                );

        }


        /**
         * ------------------------------------------------------
         * Schedule Sessions
         * ------------------------------------------------------
         */

        for (
            const session of sessions
        ) {


            /**
             * --------------------------------------------------
             * Find Placement
             * --------------------------------------------------
             */

            const placement =

                findPlacement({

                    session,

                    days,

                    timeSlots,

                    venues,

                    timetableEntries,

                    isGroupSchedule:
                        false,

                    targetSlot

                });


            /**
             * --------------------------------------------------
             * No Placement
             * --------------------------------------------------
             */

            if (!placement) {

                failedSessions++;

                continue;

            }


            /**
             * --------------------------------------------------
             * Select Venue
             * --------------------------------------------------
             */

            const venue =

                placement
                    .suitableVenues[0];


            /**
             * --------------------------------------------------
             * Create Timetable Entries
             * --------------------------------------------------
             */

            for (
                const slot of placement.slots
            ) {


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


                entries.push(
                    entry
                );


                timetableEntries.push(
                    entry
                );

            }


            scheduledSessions++;

        }


        /**
         * ------------------------------------------------------
         * Persist New Entries
         * ------------------------------------------------------
         */

        for (
            const entry of entries
        ) {

            await repository.saveEntry(
                entry
            );

        }


        /**
         * ------------------------------------------------------
         * Single Mode Result
         * ------------------------------------------------------
         */

        if (isSingleMode) {

            return {

                success:
                    scheduledSessions > 0,

                mode:
                    "single",

                totalSessions,

                scheduledSessions,

                failedSessions,

                createdEntries:
                    entries.length

            };

        }


        /**
         * ------------------------------------------------------
         * Bulk Mode Result
         * ------------------------------------------------------
         */

        return {

            success: true,

            mode:
                "bulk",

            totalSessions,

            skippedSessions,

            scheduledSessions,

            failedSessions,

            createdEntries:
                entries.length

        };

    }
    
        /**
     * ----------------------------------------------------------
     * Generate Single Normal Timetable
     * ----------------------------------------------------------
     *
     * Used by:
     *
     * - Timetable grid (+) button
     *
     * Schedules one course offering into
     * a selected day, time slot and venue.
     *
     * IMPORTANT:
     *
     * A course allocation is OPTIONAL.
     *
     * If an allocation exists:
     * - lecturer is attached
     * - course_allocation_id is attached
     *
     * If no allocation exists:
     * - lecturer_id = null
     * - course_allocation_id = null
     *
     * The course can still be scheduled.
     *
     * ----------------------------------------------------------
     */

    async generateSingle({

        courseOfferingId,

        courseAllocationId = null,

        targetSlot

    }) {


        /**
         * ------------------------------------------------------
         * Validate Required Data
         * ------------------------------------------------------
         */

        if (!courseOfferingId) {

            throw new Error(
                "Course offering is required."
            );

        }


        if (!targetSlot) {

            throw new Error(
                "Target timetable slot is required."
            );

        }


        /**
         * ------------------------------------------------------
         * Load Scheduling Data
         * ------------------------------------------------------
         */

        const [

            courseOffering,

            courses,

            departments,

            courseAllocations,

            days,

            timeSlots,

            venues,

            timetableEntries

        ] = await Promise.all([

            repository.getCourseOfferingById(
                courseOfferingId
            ),

            repository.getCourses(),

            repository.getDepartments(),

            repository.getCourseAllocations(),

            repository.getDays(),

            repository.getTimeSlots(),

            repository.getVenues(),

            repository.getExistingTimetable()

        ]);


        /**
         * ------------------------------------------------------
         * Validate Course Offering
         * ------------------------------------------------------
         */

        if (!courseOffering) {

            throw new Error(
                "Course offering not found."
            );

        }


        /**
         * ------------------------------------------------------
         * Find Course
         * ------------------------------------------------------
         */

        const course =

            courses.find(

                item =>

                    item.id ===
                    courseOffering.course_id

            );


        if (!course) {

            throw new Error(
                "Course attached to this offering was not found."
            );

        }


        /**
         * ------------------------------------------------------
         * Find Department
         * ------------------------------------------------------
         */

        const department =

            departments.find(

                item =>

                    item.id ===
                    course.department_id

            );


        /**
         * ------------------------------------------------------
         * Find Optional Course Allocation
         * ------------------------------------------------------
         *
         * The course DOES NOT need to be allocated.
         *
         * If courseAllocationId was supplied,
         * verify that it belongs to this course offering.
         *
         * If no allocation was supplied, continue with
         * lecturer_id and course_allocation_id as null.
         *
         * ------------------------------------------------------
         */

        let allocation = null;


        if (courseAllocationId) {

            allocation =

                courseAllocations.find(

                    item =>

                        item.id ===
                        courseAllocationId &&

                        item.course_offering_id ===
                        courseOfferingId

                );


            if (!allocation) {

                throw new Error(
                    "The selected course allocation does not belong to this course offering."
                );

            }

        }


        /**
         * ------------------------------------------------------
         * Prevent Duplicate Course Session
         * ------------------------------------------------------
         *
         * A course offering should not have the same
         * session number scheduled twice.
         *
         * Since manual scheduling creates one session,
         * we use session number 1.
         *
         * ------------------------------------------------------
         */

        const existingCourseEntry =

            timetableEntries.find(

                entry =>

                    !entry.is_group &&

                    entry.course_offering_id ===
                    courseOfferingId &&

                    entry.session_number === 1

            );


        if (existingCourseEntry) {

            throw new Error(
                "This course has already been scheduled."
            );

        }


        /**
         * ------------------------------------------------------
         * Prepare Session
         * ------------------------------------------------------
         */

        const session = {

            courseId:
                course.id,


            courseOfferingId:
                courseOffering.id,


            courseAllocationId:
                allocation?.id || null,


            lecturerId:
                allocation?.lecturer_id || null,


            departmentId:
                course.department_id,


            facultyId:
                department?.faculty_id || null,


            programmeId:
                courseOffering.programme_id,


            levelId:
                courseOffering.level_id,


            sessionId:
                courseOffering.session_id,


            semesterId:
                courseOffering.semester_id,


            /**
             * Duration of the lecture.
             *
             * Falls back to one slot when
             * hours_per_session is not available.
             */

            duration:
                course.hours_per_session || 1,


            venueType:
                course.preferred_venue_type || null,


            sessionNumber:
                1

        };


        /**
         * ------------------------------------------------------
         * Find Selected Day
         * ------------------------------------------------------
         */

        const day =

            days.find(

                item =>

                    item.id ===
                    targetSlot.dayId

            );


        if (!day) {

            throw new Error(
                "Invalid day selected."
            );

        }


        /**
         * ------------------------------------------------------
         * Find Selected Time Slot
         * ------------------------------------------------------
         */

        const slot =

            timeSlots.find(

                item =>

                    item.id ===
                    targetSlot.timeSlotId

            );


        if (!slot) {

            throw new Error(
                "Invalid time slot selected."
            );

        }


        /**
         * ------------------------------------------------------
         * Find Selected Venue
         * ------------------------------------------------------
         */

        const venue =

            venues.find(

                item =>

                    item.id ===
                    targetSlot.venueId

            );


        if (!venue) {

            throw new Error(
                "Invalid venue selected."
            );

        }


        /**
         * ------------------------------------------------------
         * Validate Selected Placement
         * ------------------------------------------------------
         *
         * The backtracking engine still performs
         * all normal conflict checks:
         *
         * - Venue conflict
         * - Lecturer conflict
         * - Programme conflict
         * - Level conflict
         * - Time conflict
         * - Venue type requirements
         *
         * ------------------------------------------------------
         */

        const placement =

            findPlacement({

                session,

                days,

                timeSlots,

                venues,

                timetableEntries,

                isGroupSchedule:
                    false,

                targetSlot: {

                    day,

                    slots: [
                        slot
                    ],

                    venue

                }

            });


        if (!placement) {

            throw new Error(
                "Course cannot be scheduled in this slot."
            );

        }


        /**
         * ------------------------------------------------------
         * Create Timetable Entry
         * ------------------------------------------------------
         */

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


            programme_id:
                session.programmeId,


            level_id:
                session.levelId,


            session_id:
                session.sessionId,


            semester_id:
                session.semesterId,


            course_offering_id:
                session.courseOfferingId,


            /**
             * NULL when the course is not allocated.
             */

            course_allocation_id:
                session.courseAllocationId,


            day_id:
                day.id,


            time_slot_id:
                slot.id,


            session_number:
                session.sessionNumber,


            is_group:
                false,


            group_lecture_id:
                null,


            group_participant_id:
                null,


            is_locked:
                false

        };


        /**
         * ------------------------------------------------------
         * Save Entry
         * ------------------------------------------------------
         */

        const savedEntry =

            await repository.saveEntry(
                entry
            );


        /**
         * ------------------------------------------------------
         * Return Result
         * ------------------------------------------------------
         */

        return {

            success:
                true,


            mode:
                "single",


            courseOfferingId:
                courseOfferingId,


            courseAllocationId:
                allocation?.id || null,


            scheduledWithoutAllocation:
                !allocation,


            createdEntries:
                1,


            entry:
                savedEntry

        };

    }

}


module.exports =
    new NormalScheduler();