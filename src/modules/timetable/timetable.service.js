const timetableRepository = require("./timetable.repository");

class TimetableService {
  async createTimetable(payload) {
    return await timetableRepository.create(payload);
  }

  async getAllTimetables() {
    return await timetableRepository.findAll();
  }

  async getTimetableById(id) {
    const timetable = await timetableRepository.findById(id);

    if (!timetable) {
      throw new Error("Timetable entry not found.");
    }

    return timetable;
  }

  async updateTimetable(id, payload) {
    return await timetableRepository.update(id, payload);
  }

  async deleteTimetable(id) {
    return await timetableRepository.delete(id);
  }
}

module.exports = new TimetableService();