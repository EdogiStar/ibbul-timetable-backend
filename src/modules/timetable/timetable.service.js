const timetableRepository =
    require("./timetable.repository");

const groupScheduler =
    require("../scheduling-engine/group/scheduler");

const normalScheduler =
    require("../scheduling-engine/normal/scheduler");


class TimetableService {


    /**
     * ----------------------------------------------------------
     * Generate Group Timetable
     * ----------------------------------------------------------
     */
    async generateGroupTimetable() {

        return await groupScheduler.generate();

    }


    /**
     * ----------------------------------------------------------
     * Generate Normal Timetable
     * ----------------------------------------------------------
     *
     * BULK MODE
     *
     * Generates schedules for all eligible
     * normal course offerings.
     *
     * ----------------------------------------------------------
     */
    
     /**
 * ----------------------------------------------------------
 * Get Available Venues
 * ----------------------------------------------------------
 */
async getAvailableVenues(
    dayId,
    timeSlotId
) {

    return await timetableRepository
        .getAvailableVenues(
            dayId,
            timeSlotId
        );

}

    async generateNormalTimetable() {

        return await normalScheduler.generate();

    }


    /**
     * ----------------------------------------------------------
     * Generate Normal Timetable For One Course
     * ----------------------------------------------------------
     *
     * SINGLE MODE
     *
     * Used when admin selects a specific
     * course allocation and a specific free slot.
     *
     * Example:
     *
     * generateNormalTimetableForOne({
     *     courseAllocationId,
     *     targetSlot
     * })
     *
     * ----------------------------------------------------------
     */
    async generateNormalTimetableForOne(payload) {

        return await normalScheduler.generate({

            courseAllocationId:
                payload.courseAllocationId,

            targetSlot:
                payload.targetSlot

        });

    }
    
    async generateSingleNormalTimetable(payload) {

    return await normalScheduler.generateSingle({

        courseOfferingId:
            payload.courseOfferingId,

        courseAllocationId:
            payload.courseAllocationId || null,

        targetSlot: {

            dayId:
                payload.dayId,

            timeSlotId:
                payload.timeSlotId,

            venueId:
                payload.venueId

        }

    });

}


    /**
     * ----------------------------------------------------------
     * Generate Complete Timetable
     * ----------------------------------------------------------
     *
     * Runs:
     *
     * 1. Group Scheduler
     * 2. Normal Scheduler
     *
     * ----------------------------------------------------------
     */
    async generateTimetable() {

        const group =
            await groupScheduler.generate();


        const normal =
            await normalScheduler.generate();


        return {

            success: true,

            group,

            normal

        };

    }


    /**
     * ----------------------------------------------------------
     * Create Timetable Entry
     * ----------------------------------------------------------
     *
     * Manual database creation.
     *
     * This is kept for CRUD operations.
     *
     * Scheduling itself is handled by
     * the scheduling-engine.
     * ----------------------------------------------------------
     */
    async createTimetable(payload) {

        return await timetableRepository.create(
            payload
        );

    }


    /**
     * ----------------------------------------------------------
     * Retrieve Timetable Entries
     * ----------------------------------------------------------
     */
    async getAllTimetables(filters = {}) {

        return await timetableRepository.findAll(
            filters
        );

    }


    /**
     * ----------------------------------------------------------
     * Retrieve Single Timetable Entry
     * ----------------------------------------------------------
     */
    async getTimetableById(id) {

        const timetable =
            await timetableRepository.findById(id);


        if (!timetable) {

            throw new Error(
                "Timetable entry not found."
            );

        }


        return timetable;

    }


    /**
     * ----------------------------------------------------------
     * Update Timetable Entry
     * ----------------------------------------------------------
     */
    async updateTimetable(id, payload) {

        const timetable =
            await timetableRepository.findById(id);


        if (!timetable) {

            throw new Error(
                "Timetable entry not found."
            );

        }


        return await timetableRepository.update(
            id,
            payload
        );

    }


    /**
     * ----------------------------------------------------------
     * Delete Timetable Entry
     * ----------------------------------------------------------
     */
    async deleteTimetable(id) {

        const timetable =
            await timetableRepository.findById(id);


        if (!timetable) {

            throw new Error(
                "Timetable entry not found."
            );

        }


        return await timetableRepository.delete(
            id
        );

    }
    
    /**
 * ----------------------------------------------------------
 * Clear Entire Timetable
 * ----------------------------------------------------------
 *
 * Deletes all records from timetable_entries.
 *
 * This does NOT delete:
 * - Courses
 * - Course offerings
 * - Course allocations
 * - Lecturers
 * - Venues
 * - Group lectures
 * - Departments
 * - Programmes
 * - Levels
 *
 * Only generated timetable entries are removed.
 * ----------------------------------------------------------
 */
async clearTimetable() {

    return await timetableRepository
        .clearAllTimetables();

}

}


module.exports =
    new TimetableService();