const supabase = require("../../database/supabase");

class CourseOfferingsRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("course_offerings")
      .insert(payload)
      .select(`
        *,
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
      `)
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("course_offerings")
      .select(`
        *,
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
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("course_offerings")
      .select(`
        *,
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
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
  const { data, error } = await supabase
    .from("course_offerings")
    .update(payload)
    .eq("id", id)
    .select(`
      *,
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
    `)
    .single();

  if (error) throw error;

  return data;
}

  async delete(id) {
    const { error } = await supabase
      .from("course_offerings")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new CourseOfferingsRepository();