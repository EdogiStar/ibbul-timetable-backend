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
     *
     *    generate()
     *
     *    Schedules all eligible normal course offerings.
     *
     *
     * 2. Single Scheduling
     *
     *    generate({
     *        courseAllocationId,
     *        targetSlot
     *    })
     *
     *    Schedules one selected course allocation
     *    into a selected free slot.
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
         * Only schedule the course offering
         * belonging to the selected allocation.
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
                     * In single mode we already know
                     * the selected allocation.
                     *
                     * In bulk mode we find the
                     * allocation belonging to the offering.
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

            /**
             * The selected allocation may generate
             * multiple sessions per week.
             *
             * We schedule the first unscheduled
             * session into the requested slot.
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


            /**
             * Only schedule the first
             * available session.
             */

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
             *
             * In single mode:
             *
             * targetSlot is passed to the
             * backtracking placement function.
             *
             *
             * In bulk mode:
             *
             * targetSlot remains null and
             * scheduler searches normally.
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


                /**
                 * Add to entries waiting
                 * to be saved.
                 */
                entries.push(
                    entry
                );


                /**
                 * Update in-memory timetable.
                 *
                 * This ensures that the next session
                 * knows about this newly scheduled
                 * lecture.
                 */
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
 * - Timetable modal (+ button)
 *
 * Schedules one course allocation
 * into a selected free slot.
 *
 * ----------------------------------------------------------
 */

async generateSingle({

    courseAllocationId,

    targetSlot

}) {


    const [

        allocation,

        departments,

        days,

        timeSlots,

        venues,

        timetableEntries

    ] = await Promise.all([


        repository.getCourseAllocationById(
            courseAllocationId
        ),


        repository.getDepartments(),

        repository.getDays(),

        repository.getTimeSlots(),

        repository.getVenues(),

        repository.getExistingTimetable()


    ]);



    if (!allocation) {

        throw new Error(
            "Course allocation not found."
        );

    }



    /**
     * ------------------------------------------------------
     * Prepare Course Object
     * ------------------------------------------------------
     */

    const courseOffering =
        allocation.course_offerings;


    const course =
        courseOffering.courses;



    const department =
        departments.find(
            item =>
            item.id === course.department_id
        );



    const session = {


        courseId:
            course.id,


        courseOfferingId:
            courseOffering.id,


        courseAllocationId:
            allocation.id,


        lecturerId:
            allocation.lecturer_id || null,


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
            item.id === targetSlot.dayId
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
            item.id === targetSlot.timeSlotId
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
            item.id === targetSlot.venueId
        );


    if (!venue) {

        throw new Error(
            "Invalid venue selected."
        );

    }




    /**
     * ------------------------------------------------------
     * Validate Placement
     * ------------------------------------------------------
     */

    const placement =
        findPlacement({

            session,

            days,

            timeSlots,

            venues,

            timetableEntries,

            isGroupSchedule:false,

            targetSlot:{
                day,
                slots:[slot],
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


        course_allocation_id:
            session.courseAllocationId,


        day_id:
            day.id,


        time_slot_id:
            slot.id,


        session_number:
            session.sessionNumber,


        is_group:false,


        group_lecture_id:null,


        group_participant_id:null,


        is_locked:false


    };



    await repository.saveEntry(
        entry
    );



    return {

        success:true,

        entry

    };


}

}


module.exports =
    new NormalScheduler();