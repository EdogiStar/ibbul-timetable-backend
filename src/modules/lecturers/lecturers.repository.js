const supabase = require("../../database/supabase");

class LecturersRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("lecturers")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("lecturers")
      .select(`
        *,
        departments (
          id,
          code,
          name
        )
      `)
      .order("full_name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("lecturers")
      .select(`
        *,
        departments (
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
      .from("lecturers")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("lecturers")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new LecturersRepository();