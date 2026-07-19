const supabase = require("../../database/supabase");

class GroupLectureGroupsRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("group_lecture_groups")
      .insert(payload)
      .select(`
        *,
        group_lectures(
          id,
          name,
          courses(
            id,
            course_code,
            course_title
          )
        ),
        lecturers(
          id,
          full_name,
          staff_id
        ),
        venues(
          id,
          venue_code,
          venue_name
        )
      `)
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("group_lecture_groups")
      .select(`
        *,
        group_lectures(
          id,
          name,
          courses(
            id,
            course_code,
            course_title
          )
        ),
        lecturers(
          id,
          full_name,
          staff_id
        ),
        venues(
          id,
          venue_code,
          venue_name
        )
      `)
      .order("group_name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("group_lecture_groups")
      .select(`
        *,
        group_lectures(
          id,
          name,
          courses(
            id,
            course_code,
            course_title
          )
        ),
        lecturers(
          id,
          full_name,
          staff_id
        ),
        venues(
          id,
          venue_code,
          venue_name
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("group_lecture_groups")
      .update(payload)
      .eq("id", id)
      .select(`
        *,
        group_lectures(
          id,
          name,
          courses(
            id,
            course_code,
            course_title
          )
        ),
        lecturers(
          id,
          full_name,
          staff_id
        ),
        venues(
          id,
          venue_code,
          venue_name
        )
      `)
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("group_lecture_groups")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new GroupLectureGroupsRepository();