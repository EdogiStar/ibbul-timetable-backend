const semestersRepository = require("./semesters.repository");

class SemestersService {
  async createSemester(payload) {
    return await semestersRepository.create(payload);
  }

  async getAllSemesters() {
    return await semestersRepository.findAll();
  }

  async getSemesterById(id) {
    const semester = await semestersRepository.findById(id);

    if (!semester) {
      throw new Error("Semester not found.");
    }

    return semester;
  }

  async updateSemester(id, payload) {
    return await semestersRepository.update(id, payload);
  }

  async deleteSemester(id) {
    return await semestersRepository.delete(id);
  }
}

module.exports = new SemestersService();