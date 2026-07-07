const supabase = require("../../database/supabase");

class CourseAllocationRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("course_allocations")
      .insert(payload)
      .select(`
        *,
        course_offerings (
          id,
          course_id,
          programme_id,
          level_id,
          session_id,
          semester_id,
          is_compulsory
        ),
        lecturers (
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
        course_offerings (
          id,
          course_id,
          programme_id,
          level_id,
          session_id,
          semester_id,
          is_compulsory
        ),
        lecturers (
          id,
          full_name,
          staff_id
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("course_allocations")
      .select(`
        *,
        course_offerings (
          id,
          course_id,
          programme_id,
          level_id,
          session_id,
          semester_id,
          is_compulsory
        ),
        lecturers (
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
        course_offerings (
          id,
          course_id,
          programme_id,
          level_id,
          session_id,
          semester_id,
          is_compulsory
        ),
        lecturers (
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