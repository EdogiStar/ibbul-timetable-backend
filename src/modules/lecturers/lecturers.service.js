const lecturersRepository = require("./lecturers.repository");

class LecturersService {
  async createLecturer(payload) {
    return await lecturersRepository.create(payload);
  }

  async getAllLecturers() {
    return await lecturersRepository.findAll();
  }

  async getLecturerById(id) {
    const lecturer = await lecturersRepository.findById(id);

    if (!lecturer) {
      throw new Error("Lecturer not found.");
    }

    return lecturer;
  }

  async updateLecturer(id, payload) {
    return await lecturersRepository.update(id, payload);
  }

  async deleteLecturer(id) {
    return await lecturersRepository.delete(id);
  }
}

module.exports = new LecturersService();