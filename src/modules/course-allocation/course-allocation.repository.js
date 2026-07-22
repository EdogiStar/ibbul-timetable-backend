const supabase = require("../../database/supabase");

class CourseAllocationRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("course_allocations")
      .insert(payload)
      .select(`...
        *,
        course_offerings(
  id,
  is_compulsory,
  courses(
    id,
    course_code,
    course_title
  ),
  programmes(
  id,
  code,
  name
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
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("course_allocations")
      .select(`
        *,
       course_offerings(
  id,
  is_compulsory,
  courses(
    id,
    course_code,
    course_title
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
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }
  
  /**
 * ----------------------------------------------------
 * Retrieve Course Allocations
 * that have NOT been scheduled.
 * ----------------------------------------------------
 */
async findAvailable() {

  const { data, error } = await supabase
    .from("course_allocations")
    .select(`
      *,
      course_offerings(
        id,
        is_compulsory,
        courses(
          id,
          course_code,
          course_title
        ),
        programmes(
          id,
          code,
          name
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
    `);

  if (error) throw error;

  /**
   * ----------------------------------------
   * Remove already scheduled allocations
   * ----------------------------------------
   */
  const { data: timetableEntries, error: timetableError } =
    await supabase
      .from("timetable_entries")
      .select("course_allocation_id");

  if (timetableError) throw timetableError;

  const scheduled = new Set(
    timetableEntries.map(
      (entry) => entry.course_allocation_id
    )
  );

  return data.filter(
    (allocation) =>
      !scheduled.has(allocation.id)
  );

}

  async findById(id) {
    const { data, error } = await supabase
      .from("course_allocations")
      .select(`
        *,
        course_offerings(
  id,
  is_compulsory,
  courses(
    id,
    course_code,
    course_title
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

  async update(id, payload) {
    const { data, error } = await supabase
      .from("course_allocations")
      .update(payload)
      .eq("id", id)
      .select(`
        *,
        course_offerings(
  id,
  is_compulsory,
  courses(
    id,
    course_code,
    course_title
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
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("course_allocations")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new CourseAllocationRepository();