const supabase = require("../../database/supabase");

class StudentsRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("students")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("students")
      .select(`
        *,
        users (
          id,
          full_name,
          email
        ),
        programmes (
          id,
          code,
          name
        ),
        levels (
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
      .from("students")
      .select(`
        *,
        users (
          id,
          full_name,
          email
        ),
        programmes (
          id,
          code,
          name
        ),
        levels (
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
      .from("students")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new StudentsRepository();