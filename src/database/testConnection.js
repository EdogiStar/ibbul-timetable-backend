require("dotenv").config();

const supabase = require("./supabase");

async function testConnection() {
  const { data, error } = await supabase
    .from("pg_tables")
    .select("*")
    .limit(1);

  if (error) {
    console.log("❌ Connection Failed");
    console.log(error.message);
    return;
  }

  console.log("✅ Connected Successfully");
}

testConnection();