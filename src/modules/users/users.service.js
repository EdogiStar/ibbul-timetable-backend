const bcrypt = require("bcryptjs");

const usersRepository = require("./users.repository");

class UsersService {
  async createUser(payload) {
    // Check if email already exists
    const existingUser = await usersRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new Error("Email already exists.");
    }

    // Hash password
    const password_hash = await bcrypt.hash(payload.password, 10);

    // Remove plain password
    delete payload.password;

    // Prepare user data
    const user = {
      ...payload,
      password_hash,
    };

    return await usersRepository.create(user);
  }

  async getAllUsers() {
    return await usersRepository.findAll();
  }

  async getUserById(id) {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }

  async updateUser(id, payload) {
    if (payload.password) {
      payload.password_hash = await bcrypt.hash(payload.password, 10);
      delete payload.password;
    }

    return await usersRepository.update(id, payload);
  }

  async deleteUser(id) {
    return await usersRepository.delete(id);
  }
}

module.exports = new UsersService();