const supabase = require("../../database/supabase");

class GroupParticipantsRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("group_participants")
      .insert(payload)
      .select(`
        *,
        group_lecture_groups(
          id,
          group_name,
          group_lectures(
            id,
            name,
            courses(
              id,
              course_code,
              course_title
            )
          )
        ),
        programmes(
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
      .from("group_participants")
      .select(`
        *,
        group_lecture_groups(
          id,
          group_name,
          group_lectures(
            id,
            name,
            courses(
              id,
              course_code,
              course_title
            )
          )
        ),
        programmes(
          id,
          code,
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("group_participants")
      .select(`
        *,
        group_lecture_groups(
          id,
          group_name,
          group_lectures(
            id,
            name,
            courses(
              id,
              course_code,
              course_title
            )
          )
        ),
        programmes(
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
      .from("group_participants")
      .update(payload)
      .eq("id", id)
      .select(`
        *,
        group_lecture_groups(
          id,
          group_name,
          group_lectures(
            id,
            name,
            courses(
              id,
              course_code,
              course_title
            )
          )
        ),
        programmes(
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
      .from("group_participants")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new GroupParticipantsRepository();