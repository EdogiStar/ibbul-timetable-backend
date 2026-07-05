const supabase = require("../../database/supabase");

class FacultiesRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("faculties")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("faculties")
      .select("*")
      .order("name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("faculties")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("faculties")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("faculties")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new FacultiesRepository();