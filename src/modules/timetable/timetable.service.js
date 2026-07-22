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
     * Schedules all eligible normal course offerings.
     *
     * ----------------------------------------------------------
     */

    async generateNormalTimetable() {

        return await normalScheduler.generate();

    }


    /**
     * ----------------------------------------------------------
     * Generate Normal Timetable For Selected Allocations
     * ----------------------------------------------------------
     *
     * Used when we want to schedule:
     *
     * - One course allocation
     * - Multiple selected course allocations
     *
     * The scheduler handles the actual scheduling logic.
     *
     * ----------------------------------------------------------
     */

    async generateNormalTimetableForAllocations(
        courseAllocationIds
    ) {

        if (
            !Array.isArray(courseAllocationIds) ||
            courseAllocationIds.length === 0
        ) {

            throw new Error(
                "At least one course allocation is required."
            );

        }


        return await normalScheduler.generate({

            courseAllocationIds

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
     * This remains available for general CRUD operations.
     *
     * The scheduler itself is responsible for automatically
     * generating timetable entries.
     *
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

            await timetableRepository.findById(

                id

            );


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

    async updateTimetable(

        id,

        payload

    ) {


        const timetable =

            await timetableRepository.findById(

                id

            );


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

            await timetableRepository.findById(

                id

            );


        if (!timetable) {

            throw new Error(

                "Timetable entry not found."

            );

        }


        return await timetableRepository.delete(

            id

        );

    }

}


module.exports =

    new TimetableService();