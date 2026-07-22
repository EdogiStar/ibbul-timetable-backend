const supabase =
    require("../../../database/supabase");


class NormalRepository {


    /**
     * ----------------------------------------------------------
     * Get Course Offerings
     * ----------------------------------------------------------
     */

    async getCourseOfferings() {

        const {
            data,
            error
        } = await supabase

            .from("course_offerings")

            .select("*");


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Courses
     * ----------------------------------------------------------
     */

    async getCourses() {

        const {
            data,
            error
        } = await supabase

            .from("courses")

            .select("*");


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Departments
     * ----------------------------------------------------------
     */

    async getDepartments() {

        const {
            data,
            error
        } = await supabase

            .from("departments")

            .select("*");


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Course Allocations
     * ----------------------------------------------------------
     *
     * A course allocation is optional.
     *
     * Therefore, the scheduler must NOT assume that
     * every course has a lecturer assigned.
     *
     * If no allocation exists:
     *
     * lecturer_id = null
     *
     * The course can still be scheduled.
     *
     * ----------------------------------------------------------
     */

    async getCourseAllocations() {

        const {
            data,
            error
        } = await supabase

            .from("course_allocations")

            .select("*");


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Group Lectures
     * ----------------------------------------------------------
     *
     * Used to prevent normal scheduler from scheduling
     * courses already handled by the group scheduler.
     *
     * ----------------------------------------------------------
     */

    async getGroupLectures() {

        const {
            data,
            error
        } = await supabase

            .from("group_lectures")

            .select("course_id");


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Days
     * ----------------------------------------------------------
     */

    async getDays() {

        const {
            data,
            error
        } = await supabase

            .from("days")

            .select("*")

            .order(
                "sort_order",
                {
                    ascending: true
                }
            );


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Time Slots
     * ----------------------------------------------------------
     */

    async getTimeSlots() {

        const {
            data,
            error
        } = await supabase

            .from("time_slots")

            .select("*")

            .order(
                "sort_order",
                {
                    ascending: true
                }
            );


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Venues
     * ----------------------------------------------------------
     */

    async getVenues() {

        const {
            data,
            error
        } = await supabase

            .from("venues")

            .select("*");


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Get Existing Timetable
     * ----------------------------------------------------------
     *
     * Existing entries are loaded into memory before
     * scheduling begins.
     *
     * The backtracking algorithm uses them to avoid
     * conflicts with existing lectures.
     *
     * ----------------------------------------------------------
     */

    async getExistingTimetable() {

        const {
            data,
            error
        } = await supabase

            .from("timetable_entries")

            .select("*");


        if (error) {

            throw error;

        }


        return data;

    }


    /**
     * ----------------------------------------------------------
     * Save Timetable Entry
     * ----------------------------------------------------------
     */

    async saveEntry(payload) {

        const {
            data,
            error
        } = await supabase

            .from("timetable_entries")

            .insert(payload)

            .select()

            .single();


        if (error) {

            throw error;

        }


        return data;

    }

}


module.exports =
    new NormalRepository();
    