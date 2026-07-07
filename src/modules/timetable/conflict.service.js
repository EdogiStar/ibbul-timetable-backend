const supabase = require("../../database/supabase");

class ConflictService {
  async checkVenueConflict({
    venue_id,
    day_of_week,
    start_time,
    end_time,
    excludeId = null,
  }) {
    let query = supabase
      .from("timetables")
      .select("*")
      .eq("venue_id", venue_id)
      .eq("day_of_week", day_of_week);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.find(
      (item) =>
        start_time < item.end_time &&
        end_time > item.start_time
    );
  }

  async checkLecturerConflict({
    lecturer_id,
    day_of_week,
    start_time,
    end_time,
    excludeId = null,
  }) {
    // No lecturer assigned yet
    if (!lecturer_id) return null;

    let query = supabase
      .from("timetables")
      .select("*")
      .eq("lecturer_id", lecturer_id)
      .eq("day_of_week", day_of_week);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.find(
      (item) =>
        start_time < item.end_time &&
        end_time > item.start_time
    );
  }

  async checkStudentConflict({
    course_id,
    day_of_week,
    start_time,
    end_time,
    excludeId = null,
  }) {
    // Fetch the course being scheduled
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select(`
        id,
        department_id,
        programme_id,
        level_id,
        semester_id
      `)
      .eq("id", course_id)
      .single();

    if (courseError) throw courseError;

    let query = supabase
      .from("timetables")
      .select(`
        *,
        courses (
          department_id,
          programme_id,
          level_id,
          semester_id
        )
      `)
      .eq("day_of_week", day_of_week);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data.find((item) => {
      if (!item.courses) return false;

      return (
        item.courses.department_id === course.department_id &&
        item.courses.programme_id === course.programme_id &&
        item.courses.level_id === course.level_id &&
        item.courses.semester_id === course.semester_id &&
        start_time < item.end_time &&
        end_time > item.start_time
      );
    });
  }
}

module.exports = new ConflictService();