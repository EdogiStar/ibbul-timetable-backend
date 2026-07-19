/**
 * ------------------------------------------------------------------
 * Constraint Checker
 * ------------------------------------------------------------------
 * Checks whether a lecture session can be placed in a location/time.
 * ------------------------------------------------------------------
 */


function canPlaceSession({
    session,
    day,
    slots,
    venue,
    timetableEntries,
    isGroupSchedule
}) {


    /**
     * 1. Venue capacity check
     *
     * Only applies to normal lectures.
     *
     * Reject if:
     * students > venue capacity * 2
     */
    if (!isGroupSchedule) {

        if (
            session.studentCount >
            venue.capacity * 2
        ) {
            return false;
        }

    }
    
    /**
 * ----------------------------------------------------------
 * Friday Prayer Constraint
 *
 * Block Friday 01-02 (13:00 - 14:00)
 * for all lectures.
 * ----------------------------------------------------------
 */

const isFriday =
    day.code === "FRI";

const blockedSlot =
    slots.some(
        slot => slot.code === "01-02"
    );

if (isFriday && blockedSlot) {
    return false;
}


    /**
     * Check every occupied slot
     */
    for (const slot of slots) {


        const conflict = timetableEntries.some(entry => {


            /**
             * Same venue conflict
             */
            if (
                entry.venue_id === venue.id &&
                entry.day_id === day.id &&
                entry.time_slot_id === slot.id
            ) {
                return true;
            }


            /**
             * Lecturer conflict
             *
             * Skip if no lecturer assigned
             */
            if (
                session.lecturerId &&
                entry.lecturer_id === session.lecturerId &&
                entry.day_id === day.id &&
                entry.time_slot_id === slot.id
            ) {
                return true;
            }


            /**
             * Student/programme conflict
             *
             * Same programme + level cannot have
             * two lectures at the same time.
             */
            if (
                entry.programme_id === session.programmeId &&
                entry.level_id === session.levelId &&
                entry.day_id === day.id &&
                entry.time_slot_id === slot.id
            ) {
                return true;
            }


            /**
             * Group lecture conflict
             */
            if (
                isGroupSchedule &&
                entry.group_lecture_id === session.groupLectureId &&
                entry.day_id === day.id &&
                entry.time_slot_id === slot.id
            ) {
                return true;
            }


            return false;

        });


        if (conflict) {
            return false;
        }

    }


    return true;
}


module.exports = {
    canPlaceSession
};