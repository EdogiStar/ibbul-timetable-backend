const sessionsRepository = require("./sessions.repository");

class SessionsService {
  async createSession(payload) {
    return await sessionsRepository.create(payload);
  }

  async getAllSessions() {
    return await sessionsRepository.findAll();
  }

  async getSessionById(id) {
    const session = await sessionsRepository.findById(id);

    if (!session) {
      throw new Error("Session not found.");
    }

    return session;
  }

  async updateSession(id, payload) {
    return await sessionsRepository.update(id, payload);
  }

  async deleteSession(id) {
    return await sessionsRepository.delete(id);
  }
}

module.exports = new SessionsService();