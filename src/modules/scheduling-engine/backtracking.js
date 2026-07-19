const { canPlaceSession } = require("./constraintChecker");

/**
 * ------------------------------------------------------------------
 * Backtracking Scheduler
 * ------------------------------------------------------------------
 * Shared scheduling engine for:
 * - Group lectures
 * - Normal lectures
 * ------------------------------------------------------------------
 */


/**
 * Find the first valid placement for a session.
 */
function findPlacement({

    session,
    days,
    timeSlots,
    venues,
    timetableEntries,
    isGroupSchedule

}) {

    const suitableVenues = session.venueType
        ? venues.filter(
            venue =>
                venue.venue_type === session.venueType
        )
        : venues;


    for (const day of days) {

        for (
            let startIndex = 0;
            startIndex < timeSlots.length;
            startIndex++
        ) {

            const slots = timeSlots.slice(
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

    const valid = canPlaceSession({

        session,
        day,
        slots,
        venue,
        timetableEntries,
        isGroupSchedule

    });

    if (valid) {
        availableVenues.push(venue);
    }

}

if (availableVenues.length > 0) {

    return {

        day,
        slots,
        suitableVenues: availableVenues

    };

}
        }

    }

    return null;

}


/**
 * Recursive scheduler.
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

    if (sessionIndex >= sessions.length) {
        return true;
    }


    const session =
        sessions[sessionIndex];


    const placement =
        findPlacement({

            session,
            days,
            timeSlots,
            venues,
            timetableEntries,
            isGroupSchedule

        });


    if (!placement) {
        return false;
    }


    placements.push({

        session,
        day: placement.day,
        slots: placement.slots,
        venue: placement.suitableVenues[0]

    });


    placement.slots.forEach(slot => {

        timetableEntries.push({

            lecturer_id:
                session.lecturerId || null,

            programme_id:
                session.programmeId,

            level_id:
                session.levelId,

            venue_id:
    placement.suitableVenues[0].id,

            day_id:
                placement.day.id,

            time_slot_id:
                slot.id,

            group_lecture_id:
                session.groupLectureId || null

        });

    });


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


    if (success) {
        return true;
    }


    placements.pop();

    timetableEntries.splice(
        timetableEntries.length - placement.slots.length,
        placement.slots.length
    );


    return false;

}


module.exports = {

    findPlacement,
    scheduleSessions

};