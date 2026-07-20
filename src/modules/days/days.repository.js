const supabase = require("../../database/supabase");

class DaysRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("days")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("days")
      .select("*")
      .order("sort_order");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("days")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("days")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("days")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new DaysRepository();