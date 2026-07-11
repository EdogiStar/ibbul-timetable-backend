const facultiesRepository = require("./faculties.repository");

class FacultiesService {
  async createFaculty(payload) {
    try {
      return await facultiesRepository.create(payload);
    } catch (error) {
      if (error.code === "23505") {
        switch (error.constraint) {
          case "faculties_code_key":
            throw new Error("Faculty code already exists.");

          case "faculties_name_key":
            throw new Error("Faculty name already exists.");

          default:
            throw new Error("Faculty already exists.");
        }
      }

      throw error;
    }
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
    try {
      return await facultiesRepository.update(id, payload);
    } catch (error) {
      if (error.code === "23505") {
        switch (error.constraint) {
          case "faculties_code_key":
            throw new Error("Faculty code already exists.");

          case "faculties_name_key":
            throw new Error("Faculty name already exists.");

          default:
            throw new Error("Faculty already exists.");
        }
      }

      throw error;
    }
  }

  async deleteFaculty(id) {
    return await facultiesRepository.delete(id);
  }
}

module.exports = new FacultiesService();