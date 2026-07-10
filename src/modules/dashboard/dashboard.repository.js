const supabase = require("../../database/supabase");

class DashboardRepository {
  async getDashboardStats() {
    const [
      users,
      faculties,
      departments,
      programmes,
      levels,
      sessions,
      semesters,
      lecturers,
      students,
      venues,
      courses,
      courseOfferings,
    ] = await Promise.all([
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("faculties").select("*", { count: "exact", head: true }),
      supabase.from("departments").select("*", { count: "exact", head: true }),
      supabase.from("programmes").select("*", { count: "exact", head: true }),
      supabase.from("levels").select("*", { count: "exact", head: true }),
      supabase.from("sessions").select("*", { count: "exact", head: true }),
      supabase.from("semesters").select("*", { count: "exact", head: true }),
      supabase.from("lecturers").select("*", { count: "exact", head: true }),
      supabase.from("students").select("*", { count: "exact", head: true }),
      supabase.from("venues").select("*", { count: "exact", head: true }),
      supabase.from("courses").select("*", { count: "exact", head: true }),
      supabase
        .from("course_offerings")
        .select("*", { count: "exact", head: true }),
    ]);

    return {
      users: users.count || 0,
      faculties: faculties.count || 0,
      departments: departments.count || 0,
      programmes: programmes.count || 0,
      levels: levels.count || 0,
      sessions: sessions.count || 0,
      semesters: semesters.count || 0,
      lecturers: lecturers.count || 0,
      students: students.count || 0,
      venues: venues.count || 0,
      courses: courses.count || 0,
      courseOfferings: courseOfferings.count || 0,
    };
  }
}

module.exports = new DashboardRepository();