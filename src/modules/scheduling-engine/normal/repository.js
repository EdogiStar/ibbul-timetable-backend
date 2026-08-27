const supabase = require("../../../database/supabase");

class NormalRepository {

    /**
     * ----------------------------------------------------------
     * Get Course Offerings
     * ----------------------------------------------------------
     */
    async getCourseOfferings() {

        const { data, error } = await supabase
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

        const { data, error } = await supabase
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

        const { data, error } = await supabase
            .from("departments")
            .select("*");

        if (error) {
            throw error;
        }

        return data;

    }

    /**
 * ----------------------------------------------------------
 * Get Course Offering By ID
 * ----------------------------------------------------------
 *
 * Used for manual timetable scheduling.
 *
 * Course allocation is OPTIONAL.
 * ----------------------------------------------------------
 */
async getCourseOfferingById(id) {

    const {
        data,
        error
    } = await supabase

        .from("course_offerings")

        .select(`
            *,
            courses(
                id,
                course_code,
                course_title,
                hours_per_week,
                hours_per_session,
                preferred_venue_type,
                department_id
            ),
            programmes(
                id,
                code,
                name
            ),
            levels(
                id,
                code,
                name
            ),
            academic_sessions(
                id,
                name
            ),
            semesters(
                id,
                code,
                name
            )
        `)

        .eq(
            "id",
            id
        )

        .single();


    if (error) {

        throw error;

    }


    return data;

}

    /**
     * ----------------------------------------------------------
     * Get Course Allocations
     * ----------------------------------------------------------
     */
    async getCourseAllocations() {

        const { data, error } = await supabase
            .from("course_allocations")
            .select("*");

        if (error) {
            throw error;
        }

        return data;

    }
    
    async getCourseAllocationById(id) {

  const { data, error } = await supabase
    .from("course_allocations")
    .select(`
      *,
      course_offerings(
        id,
        course_id,
        programme_id,
        level_id,
        session_id,
        semester_id,
        is_compulsory,
        courses(
          id,
          course_code,
          course_title,
          hours_per_week,
          preferred_venue_type,
          department_id
        ),
        programmes(
          id,
          code,
          name
        ),
        levels(
          id,
          code,
          name
        ),
        academic_sessions(
          id,
          name
        ),
        semesters(
          id,
          code,
          name
        )
      ),
      lecturers(
        id,
        full_name,
        staff_id
      )
    `)
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}


    /**
     * ----------------------------------------------------------
     * Get Group Lectures
     * ----------------------------------------------------------
     *
     * Used to prevent normal scheduler from scheduling
     * courses already handled by the group scheduler.
     * ----------------------------------------------------------
     */
    async getGroupLectures() {

        const { data, error } = await supabase
            .from("group_lectures")
            .select(`
                id,
                course_id
            `);

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

        const { data, error } = await supabase
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

        const { data, error } = await supabase
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

        const { data, error } = await supabase
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
     * Used by the scheduler to detect:
     *
     * - Lecturer conflicts
     * - Programme conflicts
     * - Level conflicts
     * - Venue conflicts
     * - Existing scheduled sessions
     *
     * Both group and normal timetable entries
     * are loaded because they share the same timetable.
     * ----------------------------------------------------------
     */
    async getExistingTimetable() {

        const { data, error } = await supabase
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

        const { data, error } = await supabase
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