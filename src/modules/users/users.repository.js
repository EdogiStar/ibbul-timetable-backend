const supabase = require("../../database/supabase");

class UsersRepository {
  async create(user) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("users")
      .select(`
        *,
        roles (
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

  async findByEmail(email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;

    return data;
  }

  async findAll() {
    const { data, error } = await supabase
      .from("users")
      .select(`
        *,
        roles (
          id,
          code,
          name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("users")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  async delete(id) {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return true;
  }
}

module.exports = new UsersRepository();