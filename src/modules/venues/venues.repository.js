const supabase = require("../../database/supabase");

class VenuesRepository {
  async create(payload) {
    const { data, error } = await supabase
      .from("venues")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("venues")
      .select(`
        *,
        faculties (
          id,
          code,
          name
        )
      `)
      .order("venue_name");

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("venues")
      .select(`
        *,
        faculties (
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
      .from("venues")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("venues")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new VenuesRepository();