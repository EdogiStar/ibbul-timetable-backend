const supabase = require("../../database/supabase");

class LevelsRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("levels")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("levels")
      .select("*")
      .order("name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("levels")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("levels")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("levels")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new LevelsRepository();