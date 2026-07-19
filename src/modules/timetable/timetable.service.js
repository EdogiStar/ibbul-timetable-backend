const timetableRepository = require("./timetable.repository");

const groupScheduler = require("../scheduling-engine/group/scheduler");
const normalScheduler = require("../scheduling-engine/normal/scheduler");

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
     */
    async generateNormalTimetable() {

        return await normalScheduler.generate();

    }


    /**
     * ----------------------------------------------------------
     * Generate Complete Timetable
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

        return await timetableRepository.delete(id);

    }

}

module.exports = new TimetableService();