const facultiesRepository = require("./faculties.repository");

class FacultiesService {
  async createFaculty(payload) {
    return await facultiesRepository.create(payload);
  }

  async getAllFaculties() {
    return await facultiesRepository.findAll();
  }

  async getFacultyById(id) {
    const faculty = await facultiesRepository.findById(id);

    if (!faculty) {
      throw new Error("Faculty not found.");
    }

    return faculty;
  }

  async updateFaculty(id, payload) {
    return await facultiesRepository.update(id, payload);
  }

  async deleteFaculty(id) {
    return await facultiesRepository.delete(id);
  }
}

module.exports = new FacultiesService();