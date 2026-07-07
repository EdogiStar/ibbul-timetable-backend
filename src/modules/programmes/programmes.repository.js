const supabase = require("../../database/supabase");

class ProgrammesRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("programmes")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("programmes")
      .select(`
        *,
        departments (
          id,
          code,
          name
        )
      `)
      .order("name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("programmes")
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
      .from("programmes")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("programmes")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new ProgrammesRepository();