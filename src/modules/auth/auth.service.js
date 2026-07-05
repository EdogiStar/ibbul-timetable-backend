const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRepository = require("./auth.repository");

class AuthService {
  async login(identifier, password) {
    let user = null;

    // Login using Email
    if (identifier.includes("@")) {
      user = await authRepository.findByEmail(identifier);
    } else {
      // Try Staff Number first
      user = await authRepository.findByStaffNumber(identifier);

      // If not found, try Matric Number
      if (!user) {
        user = await authRepository.findByMatricNumber(identifier);
      }
    }

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.roles.code,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        code: user.code,
        full_name: user.full_name,
        email: user.email,
        role: user.roles.name,
      },
    };
  }
}

module.exports = new AuthService();