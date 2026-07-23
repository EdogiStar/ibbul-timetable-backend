const {
    canPlaceSession
} = require("./constraintChecker");


/**
 * ------------------------------------------------------------------
 * Backtracking Scheduler
 * ------------------------------------------------------------------
 *
 * Shared by:
 *
 * 1. Group Scheduler
 * 2. Normal Scheduler
 *
 * Supports:
 *
 * - Bulk scheduling
 * - Single-slot scheduling
 *
 * ------------------------------------------------------------------
 */


/**
 * ------------------------------------------------------------------
 * Find Placement
 * ------------------------------------------------------------------
 *
 * BULK MODE
 *
 * targetSlot = null
 *
 * The scheduler searches through:
 *
 * Day
 *   ↓
 * Time Slot
 *   ↓
 * Venue
 *
 *
 * SINGLE MODE
 *
 * targetSlot = {
 *     dayId,
 *     timeSlotId,
 *     venueId
 * }
 *
 * The scheduler checks ONLY that exact location.
 *
 * ------------------------------------------------------------------
 */
function findPlacement({

    session,

    days,

    timeSlots,

    venues,

    timetableEntries,

    isGroupSchedule,

    targetSlot = null

}) {


    const suitableVenues =
        session.venueType

        ? venues.filter(
            venue =>
            venue.venue_type === session.venueType
        )

        : venues;



    /**
     * ------------------------------------------------------
     * SINGLE SLOT MODE
     * ------------------------------------------------------
     *
     * Used by manual scheduling from modal.
     *
     * Only check the selected slot.
     *
     * ------------------------------------------------------
     */

    if (targetSlot) {


        const selectedVenue =
            suitableVenues.find(
                venue =>
                venue.id === targetSlot.venue.id
            );


        if (!selectedVenue) {

            return null;

        }



        const valid =
            canPlaceSession({

                session,

                day:
                    targetSlot.day,

                slots:
                    targetSlot.slots,

                venue:
                    selectedVenue,

                timetableEntries,

                isGroupSchedule

            });



        if (!valid) {

            return null;

        }



        return {

            day:
                targetSlot.day,


            slots:
                targetSlot.slots,


            suitableVenues:[
                selectedVenue
            ]

        };

    }




    /**
     * ------------------------------------------------------
     * BULK MODE
     * ------------------------------------------------------
     *
     * Existing scheduler behaviour.
     *
     * ------------------------------------------------------
     */


    for (const day of days) {


        for (
            let startIndex = 0;
            startIndex < timeSlots.length;
            startIndex++
        ) {


            const slots =
                timeSlots.slice(
                    startIndex,
                    startIndex + session.duration
                );



            if (
                slots.length !== session.duration
            ) {

                continue;

            }




            const availableVenues = [];



            for (const venue of suitableVenues) {


                const valid =
                    canPlaceSession({

                        session,

                        day,

                        slots,

                        venue,

                        timetableEntries,

                        isGroupSchedule

                    });



                if (valid) {

                    availableVenues.push(
                        venue
                    );

                }

            }



            if (
                availableVenues.length > 0
            ) {


                return {


                    day,


                    slots,


                    suitableVenues:
                        availableVenues


                };


            }


        }


    }



    return null;

}
/**
 * ------------------------------------------------------------------
 * Recursive Scheduler
 * ------------------------------------------------------------------
 *
 * Used for scheduling multiple sessions.
 *
 * The function remains compatible with the existing
 * group scheduling implementation.
 *
 * ------------------------------------------------------------------
 */
function scheduleSessions({

    sessions,

    sessionIndex = 0,

    days,

    timeSlots,

    venues,

    timetableEntries,

    placements,

    isGroupSchedule

}) {


    /**
     * --------------------------------------------------------------
     * All Sessions Scheduled
     * --------------------------------------------------------------
     */

    if (
        sessionIndex >=
        sessions.length
    ) {

        return true;

    }


    /**
     * --------------------------------------------------------------
     * Current Session
     * --------------------------------------------------------------
     */

    const session =
        sessions[
            sessionIndex
        ];


    /**
     * --------------------------------------------------------------
     * Find Placement
     * --------------------------------------------------------------
     */

    const placement =

        findPlacement({

            session,

            days,

            timeSlots,

            venues,

            timetableEntries,

            isGroupSchedule

        });


    /**
     * --------------------------------------------------------------
     * No Placement
     * --------------------------------------------------------------
     */

    if (!placement) {

        return false;

    }


    /**
     * --------------------------------------------------------------
     * Select First Suitable Venue
     * --------------------------------------------------------------
     */

    const venue =

        placement
            .suitableVenues[0];


    /**
     * --------------------------------------------------------------
     * Store Placement
     * --------------------------------------------------------------
     */

    placements.push({

        session,

        day:
            placement.day,

        slots:
            placement.slots,

        venue

    });


    /**
     * --------------------------------------------------------------
     * Update In-Memory Timetable
     * --------------------------------------------------------------
     */

    placement.slots.forEach(

        slot => {

            timetableEntries.push({

                lecturer_id:
                    session.lecturerId ||
                    null,

                programme_id:
                    session.programmeId,

                level_id:
                    session.levelId,

                venue_id:
                    venue.id,

                day_id:
                    placement.day.id,

                time_slot_id:
                    slot.id,

                group_lecture_id:
                    session.groupLectureId ||
                    null

            });

        }

    );


    /**
     * --------------------------------------------------------------
     * Recursively Schedule Next Session
     * --------------------------------------------------------------
     */

    const success =

        scheduleSessions({

            sessions,

            sessionIndex:
                sessionIndex + 1,

            days,

            timeSlots,

            venues,

            timetableEntries,

            placements,

            isGroupSchedule

        });


    /**
     * --------------------------------------------------------------
     * Successful
     * --------------------------------------------------------------
     */

    if (success) {

        return true;

    }


    /**
     * --------------------------------------------------------------
     * BACKTRACK
     * --------------------------------------------------------------
     */

    placements.pop();


    /**
     * Remove the timetable entries
     * created for this placement.
     * --------------------------------------------------------------
     */

    timetableEntries.splice(

        timetableEntries.length -
        placement.slots.length,

        placement.slots.length

    );


    return false;

}


module.exports = {

    findPlacement,

    scheduleSessions

};