require("dotenv").config();

const bcrypt = require("bcryptjs");
const supabase = require("../supabase");

async function resetPassword() {
  try {
    const passwordHash = await bcrypt.hash("Admin@123", 10);

    const { error } = await supabase
      .from("users")
      .update({ password_hash: passwordHash })
      .eq("email", "admin@ibbul.edu.ng");

    if (error) throw error;

    console.log("✅ Admin password reset successfully.");
  } catch (err) {
    console.error(err);
  }
}

resetPassword();