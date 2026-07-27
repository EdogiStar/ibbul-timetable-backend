const supabase = require("../../database/supabase");

const TIMETABLE_SELECT = `
  *,
  courses(
    id,
    course_code,
    course_title,
    student_count,
    sessions_per_week,
    hours_per_week,
    preferred_venue_type
  ),
  course_offerings(
    id
  ),
  lecturers(
    id,
    full_name,
    staff_id
  ),
  departments(
    id,
    code,
    name
  ),
  faculties(
  id,
  code,
  name,
  color
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
  ),
  venues(
    id,
    venue_code,
    venue_name,
    capacity,
    venue_type
  ),
  days(
    id,
    code,
    name
  ),
  time_slots(
    id,
    code,
    start_time,
    end_time
  ),
  group_lectures(
    id
  )
`;

class TimetableRepository {

  /**
   * ----------------------------------------------------------
   * Create a single timetable entry
   * ----------------------------------------------------------
   */
  async create(payload) {

    const { data, error } = await supabase
      .from("timetable_entries")
      .insert(payload)
      .select(TIMETABLE_SELECT)
      .single();

    if (error) throw error;

    return data;
  }


  /**
   * ----------------------------------------------------------
   * Retrieve timetable entries
   * ----------------------------------------------------------
   */
  async findAll(filters = {}) {

    let query = supabase
      .from("timetable_entries")
      .select(TIMETABLE_SELECT);


    if (filters.sessionId) {

      query = query.eq(
        "session_id",
        filters.sessionId
      );

    }


    if (filters.semesterId) {

      query = query.eq(
        "semester_id",
        filters.semesterId
      );

    }


    if (filters.facultyId) {

      query = query.eq(
        "faculty_id",
        filters.facultyId
      );

    }


    if (filters.departmentId) {

      query = query.eq(
        "department_id",
        filters.departmentId
      );

    }


    if (filters.programmeId) {

      query = query.eq(
        "programme_id",
        filters.programmeId
      );

    }


    if (filters.levelId) {

      query = query.eq(
        "level_id",
        filters.levelId
      );

    }


    if (filters.dayId) {

      query = query.eq(
        "day_id",
        filters.dayId
      );

    }


    if (filters.venueId) {

      query = query.eq(
        "venue_id",
        filters.venueId
      );

    }


    if (filters.courseId) {

      query = query.eq(
        "course_id",
        filters.courseId
      );

    }


    if (filters.lecturerId) {

      query = query.eq(
        "lecturer_id",
        filters.lecturerId
      );

    }


    if (filters.courseOfferingId) {

      query = query.eq(
        "course_offering_id",
        filters.courseOfferingId
      );

    }


    if (filters.courseAllocationId) {

      query = query.eq(
        "course_allocation_id",
        filters.courseAllocationId
      );

    }


    if (filters.timeSlotId) {

      query = query.eq(
        "time_slot_id",
        filters.timeSlotId
      );

    }


    if (filters.groupLectureId) {

      query = query.eq(
        "group_lecture_id",
        filters.groupLectureId
      );

    }


    if (filters.isGroup !== undefined) {

      query = query.eq(
        "is_group",
        filters.isGroup
      );

    }


    if (filters.isLocked !== undefined) {

      query = query.eq(
        "is_locked",
        filters.isLocked
      );

    }


    const {
      data,
      error
    } = await query.order(
      "created_at",
      {
        ascending: false,
      }
    );


    if (error) throw error;

    return data;
  }


  /**
   * ----------------------------------------------------------
   * Find timetable entry by ID
   * ----------------------------------------------------------
   */
  async findById(id) {

    const {
      data,
      error
    } = await supabase
      .from("timetable_entries")
      .select(TIMETABLE_SELECT)
      .eq("id", id)
      .single();


    if (error) throw error;

    return data;
  }


  /**
   * ----------------------------------------------------------
   * Update timetable entry
   * ----------------------------------------------------------
   */
  async update(id, payload) {

    const {
      data,
      error
    } = await supabase
      .from("timetable_entries")
      .update(payload)
      .eq("id", id)
      .select(TIMETABLE_SELECT)
      .single();


    if (error) throw error;

    return data;
  }


  /**
   * ----------------------------------------------------------
   * Get Available Venues
   * ----------------------------------------------------------
   *
   * Returns venues that are free on the selected
   * day and time slot.
   *
   * ----------------------------------------------------------
   */
  async getAvailableVenues(
    dayId,
    timeSlotId
  ) {

    /**
     * --------------------------------------------------------
     * Get all venues
     * --------------------------------------------------------
     */
    const {
      data: venues,
      error: venuesError,
    } = await supabase
      .from("venues")
      .select(`
        id,
        venue_code,
        venue_name,
        capacity,
        venue_type
      `)
      .order("venue_code");


    if (venuesError) {

      throw venuesError;

    }


    /**
     * --------------------------------------------------------
     * Get occupied venues for this exact slot
     * --------------------------------------------------------
     */
    const {
      data: occupiedEntries,
      error: occupiedError,
    } = await supabase
      .from("timetable_entries")
      .select("venue_id")
      .eq(
        "day_id",
        dayId
      )
      .eq(
        "time_slot_id",
        timeSlotId
      )
      .not(
        "venue_id",
        "is",
        null
      );


    if (occupiedError) {

      throw occupiedError;

    }


    /**
     * --------------------------------------------------------
     * Create set of occupied venue IDs
     * --------------------------------------------------------
     */
    const occupiedVenueIds =
      new Set(
        occupiedEntries.map(
          (entry) =>
            entry.venue_id
        )
      );


    /**
     * --------------------------------------------------------
     * Return only available venues
     * --------------------------------------------------------
     */
    return venues.filter(
      (venue) =>
        !occupiedVenueIds.has(
          venue.id
        )
    );

  }


  /**
   * ----------------------------------------------------------
   * Delete timetable entry
   * ----------------------------------------------------------
   */
  async delete(id) {

    const {
      error
    } = await supabase
      .from("timetable_entries")
      .delete()
      .eq(
        "id",
        id
      );


    if (error) throw error;

    return true;
  }

}


module.exports =
  new TimetableRepository();