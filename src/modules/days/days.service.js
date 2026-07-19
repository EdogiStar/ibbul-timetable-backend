const daysRepository = require("./days.repository");

class DaysService {
  async createDay(payload) {
    return await daysRepository.create(payload);
  }

  async getAllDays() {
    return await daysRepository.findAll();
  }

  async getDayById(id) {
    const day = await daysRepository.findById(id);

    if (!day) {
      throw new Error("Day not found.");
    }

    return day;
  }

  async updateDay(id, payload) {
    return await daysRepository.update(id, payload);
  }

  async deleteDay(id) {
    return await daysRepository.delete(id);
  }
}

module.exports = new DaysService();