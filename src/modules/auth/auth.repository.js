const supabase = require("../../database/supabase");

class AuthRepository {
  async findByEmail(email) {
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
      .eq("email", email)
      .single();

    if (error) return null;

    return data;
  }

  async findByStaffNumber(staffNumber) {
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
      .eq("staff_number", staffNumber)
      .single();

    if (error) return null;

    return data;
  }

  async findByMatricNumber(matricNumber) {
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
      .eq("matric_number", matricNumber)
      .single();

    if (error) return null;

    return data;
  }

  async create(user) {
    const { data, error } = await supabase
      .from("users")
      .insert(user)
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}

module.exports = new AuthRepository();