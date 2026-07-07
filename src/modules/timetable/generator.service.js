const supabase = require("../../database/supabase");
const timetableRepository = require("./timetable.repository");
const conflictService = require("./conflict.service");

class TimetableGeneratorService {
  async generate({
    academic_session_id,
    semester_id,
    faculty_id = null,
    department_id = null,
    programme_id = null,
    level_id = null,
  }) {
    // Fetch active courses
    let coursesQuery = supabase
      .from("courses")
      .select("*")
      .eq("status", "ACTIVE")
      .eq("semester_id", semester_id);

    if (department_id) {
      coursesQuery = coursesQuery.eq("department_id", department_id);
    }

    if (programme_id) {
      coursesQuery = coursesQuery.eq("programme_id", programme_id);
    }

    if (level_id) {
      coursesQuery = coursesQuery.eq("level_id", level_id);
    }

    const { data: courses, error: coursesError } = await coursesQuery;

    if (coursesError) throw coursesError;

    let filteredCourses = courses || [];

    // Optional faculty filter
    if (faculty_id) {
      const { data: departments, error: departmentsError } = await supabase
        .from("departments")
        .select("id")
        .eq("faculty_id", faculty_id);

      if (departmentsError) throw departmentsError;

      const departmentIds = departments.map((d) => d.id);

      filteredCourses = filteredCourses.filter((course) =>
        departmentIds.includes(course.department_id)
      );
    }

    if (filteredCourses.length === 0) {
      throw new Error("No courses found for the selected criteria.");
    }

    // Fetch venues
    const { data: venues, error: venuesError } = await supabase
      .from("venues")
      .select("*")
      .eq("status", "ACTIVE");

    if (venuesError) throw venuesError;

    if (!venues.length) {
      throw new Error("No active venues found.");
    }

    // Fetch lecturer allocations
    const { data: allocations, error: allocationError } = await supabase
      .from("course_allocations")
      .select("*")
      .eq("semester_id", semester_id);

    if (allocationError) throw allocationError;

    const lecturerMap = {};

    allocations.forEach((allocation) => {
      lecturerMap[allocation.course_id] = allocation.lecturer_id;
    });

    const days = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
    ];

    const slots = [
      { start: "08:00", end: "10:00" },
      { start: "10:00", end: "12:00" },
      { start: "12:00", end: "14:00" },
      { start: "14:00", end: "16:00" },
      { start: "16:00", end: "18:00" },
    ];

    const generated = [];

    for (const course of filteredCourses) {
      let scheduled = false;

      for (const day of days) {
        if (scheduled) break;

        for (const slot of slots) {
          if (scheduled) break;

          for (const venue of venues) {
            const lecturerId = lecturerMap[course.id] || null;

            // Venue conflict
            const venueConflict =
              await conflictService.checkVenueConflict({
                venue_id: venue.id,
                day_of_week: day,
                start_time: slot.start,
                end_time: slot.end,
              });

            if (venueConflict) continue;

            // Lecturer conflict
            const lecturerConflict =
              await conflictService.checkLecturerConflict({
                lecturer_id: lecturerId,
                day_of_week: day,
                start_time: slot.start,
                end_time: slot.end,
              });

            if (lecturerConflict) continue;

            // Student conflict
            const studentConflict =
              await conflictService.checkStudentConflict({
                department_id: course.department_id,
                programme_id: course.programme_id,
                level_id: course.level_id,
                semester_id: course.semester_id,
                day_of_week: day,
                start_time: slot.start,
                end_time: slot.end,
              });

            if (studentConflict) continue;

            const timetable = await timetableRepository.create({
              academic_session_id,
              semester_id,
              course_id: course.id,
              lecturer_id: lecturerId,
              venue_id: venue.id,
              day_of_week: day,
              start_time: slot.start,
              end_time: slot.end,
              status: "DRAFT",
            });

            generated.push(timetable);
            scheduled = true;
            break;
          }
        }
      }

      if (!scheduled) {
        throw new Error(
          `Unable to generate timetable for course ${course.code}`
        );
      }
    }

    return generated;
  }
}

module.exports = new TimetableGeneratorService();