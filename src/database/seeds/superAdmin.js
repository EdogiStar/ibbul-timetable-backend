require("dotenv").config();

const bcrypt = require("bcryptjs");
const supabase = require("../supabase");

async function seedSuperAdmin() {
  try {
    // Find SUPER_ADMIN role
    const { data: role, error: roleError } = await supabase
      .from("roles")
      .select("*")
      .eq("code", "SUPER_ADMIN")
      .maybeSingle();

    if (roleError) throw roleError;

    if (!role) {
      throw new Error("SUPER_ADMIN role not found.");
    }

    // Check if admin already exists
    const { data: existingUser, error: existingError } = await supabase
      .from("users")
      .select("id")
      .eq("email", "admin@ibbul.edu.ng")
      .maybeSingle();

    if (existingError) throw existingError;

    if (existingUser) {
      console.log("✅ Super Admin already exists.");
      return;
    }

    const passwordHash = await bcrypt.hash("Admin@123", 10);

    const { data, error } = await supabase
      .from("users")
      .insert({
        code: "ADMIN001",
        full_name: "System Administrator",
        email: "admin@ibbul.edu.ng",
        password_hash: passwordHash,
        role_id: role.id,
        status: "ACTIVE"
      })
      .select()
      .maybeSingle();

    if (error) throw error;

    console.log("✅ Super Admin created successfully!");
    console.log(data);

  } catch (error) {
    console.error("❌ Error:");
    console.error(error);
  }
}

seedSuperAdmin();