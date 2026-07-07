const supabase = require("../../database/supabase");

class SemestersRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("semesters")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("semesters")
      .select("*")
      .order("name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("semesters")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("semesters")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("semesters")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new SemestersRepository();