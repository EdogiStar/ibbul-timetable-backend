const supabase = require("../../database/supabase");

class GroupLecturesRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("group_lectures")
      .insert(payload)
      .select(`
        *,
        courses(
          id,
          course_code,
          course_title
        )
      `)
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("group_lectures")
      .select(`
        *,
        courses(
          id,
          course_code,
          course_title
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
      .from("group_lectures")
      .select(`
        *,
        courses(
          id,
          course_code,
          course_title
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("group_lectures")
      .update(payload)
      .eq("id", id)
      .select(`
        *,
        courses(
          id,
          course_code,
          course_title
        )
      `)
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("group_lectures")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new GroupLecturesRepository();