const supabase = require("../../database/supabase");

class SessionsRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("academic_sessions")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("academic_sessions")
      .select("*")
      .order("name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("academic_sessions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("academic_sessions")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("academic_sessions")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new SessionsRepository();